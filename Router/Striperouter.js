const express=require('express')
const router=express.Router()
const ordermodel=require('../Models/OrderModel')
const itemmodel=require('../Models/ItemModel')

const Stripe=require('stripe')
const stripe=Stripe(process.env.STRIPE_KEY)


router.post('/create-checkout-session', async (req, res) => {
console.log('working')
  const customer=await stripe.customers.create({
    metadata:{
      userId:req.body.userId,
      item:JSON.stringify({_id:req.body.item._id,name:req.body.item.name,pic:req.body.item.itempic,price:req.body.item.price,buyer:req.body.item.buyer,seller:req.body.item.seller})
    }
  })
    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {allowed_countries: ['US', 'IN']},
        shipping_options: [
            {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 0, currency: 'INR'},
                display_name: 'Free shipping',
                delivery_estimate: {
                minimum: {unit: 'business_day', value: 5},
                maximum: {unit: 'business_day', value: 7},
                },
            },
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {amount: 5000, currency: 'INR'},
                    display_name: '3-day shipping',
                    delivery_estimate: {
                    minimum: {unit: 'business_day', value: 2},
                    maximum: {unit: 'business_day', value: 3},
                    },
                },
                },
        ],
        phone_number_collection:{
            enabled:true
        },
        customer:customer.id,
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: {
              name:req.body.item.name,
              images:[req.body.item.itempic],
              description:req.body.item.description
            },
            unit_amount: req.body.item.price*100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/home/checkout-success',
      cancel_url: 'http://localhost:3000/home',
    });
  
    res.send({url:session.url});
  });
//create order

const createOrder=async(customer,data)=>{
  const Item=JSON.parse(customer.metadata.item)
  const newOrder=new ordermodel({
    userId:customer.metadata.userId,
    customerId:data.customer,
    paymentIntentId:data.payment_intent,
    item:Item._id,
    subtotal:data.amount_subtotal,
    total:data.amount_total,
    shipping:data.customer_details,
    payment_status:data.payment_status
  })
  try {
    await itemmodel.updateOne({_id:Item._id},{$set:{buyer:customer.metadata.userId}})
    const savedorder=await newOrder.save()
  } catch (error) {
    console.log(error)
  }
 
}


  
// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

//endpointSecret="whsec_be954a3935d6c261c53807bbdf6dba5c8fd20f8a45b20d44351109482bc42710";

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;
  if(endpointSecret){
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log('webhook verified')
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data=event.data.object;
    eventType=event.type;
  }
  else{
    data=req.body.data.object;
    eventType=req.body.type
  }

  // Handle the event
  if(eventType==='checkout.session.completed'){
    stripe.customers.retrieve(data.customer).then(
      (customer)=>{
        createOrder(customer,data)
      }
    ).catch((error)=>console.log(error))
  }
 

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});

  module.exports=router
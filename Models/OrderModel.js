const mongoose=require('mongoose')

const ordermodel=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    customerId:{
        type:String
    },
    paymentIntentId:{
        type:String,
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,ref:"Item"
    },
    subtotal:{
        type:String,
        required:true
    },
    total:{
        type:String,
        required:true
    },
    shipping:{
        type:Object,
        required:true
    },
    delivery_status:{
        type:String,
        required:true,default:"pending"
    },
    payment_status:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Order=mongoose.model("Order",ordermodel)

module.exports=Order

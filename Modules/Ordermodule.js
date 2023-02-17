const ordermodel=require('../Models/OrderModel')
const usermodel=require('../Models/UserModel')

module.exports.getorders=async(req,res)=>{
    try {
        if(req.body.user._id!="63ee86e261a8a0d1c24aadba") return res.status(400).send('Not authorized')
        let resp=await ordermodel.find().populate("item")
        resp=await usermodel.populate(resp,{
            path:"item.seller",
            select:"name email"
        })
        resp=await usermodel.populate(resp,{
            path:"item.buyer",
            select:"name email"
        })
        res.send(resp)
       
    } catch (error) {
        console.log(error)
    }
}
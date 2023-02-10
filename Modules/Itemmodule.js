const { findOneAndUpdate } = require('../Models/ItemModel')
const itemmodel=require('../Models/ItemModel')

module.exports.additem=async(req,res)=>{
    try {
        let newitem=await itemmodel.create({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            itempic:req.body.itempic,
            seller:req.body.seller
        })
        newitem=await newitem.populate("seller","name profilepic email")
        res.send(newitem)
    } catch (error) {
        console.log(error)
    }
}

module.exports.getitems=async(req,res)=>{
    try {
        const resp=await itemmodel.find()
        .populate("seller","name profilepic email")
        .populate("buyer","name profilepic email")
        res.send(resp)
    } catch (error) {
        console.log(error)
    }
}

module.exports.buyitem=async(req,res)=>{
    try {
        const itemdata=await itemmodel.findOne({_id:req.body.itemId})
        if(itemdata.buyer) return res.status(400).send('Item sold out!')
        const resp=await itemmodel.findOneAndUpdate({_id:req.body.itemId},{$set:{buyer:req.body.user._id}})
        .populate("seller","name profilepic email")
        .populate("buyer","name profilepic email")
        res.send(resp)
    } catch (error) {
        console.log(error)
    }
}

module.exports.removeitem=async(req,res)=>{
    try {
        const resp=await itemmodel.deleteOne({_id:req.body.itemId})
        res.send(resp)
    } catch (error) {
        console.log(error)
    }
}


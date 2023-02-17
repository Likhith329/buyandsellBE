const usermodel=require('../Models/UserModel')

module.exports.getusers=async(req,res)=>{
    try {
        if(req.body.user._id!="63ee86e261a8a0d1c24aadba") return res.status(400).send('Not authorized')
        const resp=await usermodel.find()
        res.send(resp)
    } catch (error) {
        console.log(error)
    }
}
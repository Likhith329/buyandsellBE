const mongoose=require('mongoose')

const itemmodel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    itempic:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW4SD5e_Wo0UVMu6kJYl32CGWEaBMWhvz_Og&usqp=CAU'
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    }
},{
    timestamps:true
})

const Item=mongoose.model("Item",itemmodel)

module.exports=Item

const express=require('express')
const router=express.Router()

const Ordermodule=require('../Modules/Ordermodule')
router.get('/getorders',Ordermodule.getorders)

module.exports=router
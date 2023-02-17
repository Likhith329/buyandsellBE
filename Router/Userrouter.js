const express=require('express')
const router=express.Router()

const Usermodule=require('../Modules/Usermodule')
router.get('/getusers',Usermodule.getusers)

module.exports=router
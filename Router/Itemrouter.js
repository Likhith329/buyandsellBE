const express=require('express')
const router=express.Router()

const Itemmodule=require('../Modules/Itemmodule')
router.post('/additem',Itemmodule.additem)
router.get('/getitems',Itemmodule.getitems)
router.put('/buyitem',Itemmodule.buyitem)
router.delete('/removeitem',Itemmodule.removeitem)


module.exports=router
const express=require('express')
const router=express.Router()

const Itemmodule=require('../Modules/Itemmodule')
router.post('/additem',Itemmodule.additem)
router.get('/getitems',Itemmodule.getitems)
router.get('/getitem/:itemId',Itemmodule.getitem)
router.put('/buyitem',Itemmodule.buyitem)
router.delete('/removeitem',Itemmodule.removeitem)
router.put('/updateitem',Itemmodule.updateitem)


module.exports=router
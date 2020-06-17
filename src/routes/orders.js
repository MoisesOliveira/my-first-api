const express = require('express')
const router = express.Router()

router.post('/',(req,res,next)=>{
    let productID = req.body.productID;
    let quantity = req.body.quantity;
    res.status(201).json({
        message: "everything ok",
        product: productID,
        quantity: quantity
    })
    
})

router.get('/:orderID', (req,res,next)=>{
    let orderID = req.params.orderID;
    res.json({
        message: `consulting order ${orderID}`
    })
})

module.exports = router;
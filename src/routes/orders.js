const express = require('express')
const router = express.Router()

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message:'posting new order'
    })
})

router.get('/:orderID', (req,res,next)=>{
    let orderID = req.params.orderID;
    res.json({
        message: `consulting order ${orderID}`
    })
})
module.exports = router;
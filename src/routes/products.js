const expres = require('express')
const router = expres.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'the new route'
    })
})

router.get('/:productID',(req,res,next)=>{
    res.status(200).json({
        message:'Getting the product id'
    })
})

router.patch('/:productID',(req,res,next)=>{
    res.status(200).json({
        message:'Updating product',
        id: req.params.productID
    })
})

router.delete('/:productID',(req,res,next)=>{
    res.status(200).json({
        message:'Deleting product'
    })
})

module.exports = router;
const expres = require('express')
const router = expres.Router()
const Product = require('../model/products')
const mongoose = require('mongoose')


router.get('/',(req,res,next)=>{
    Product.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs)
    })
})
router.post('/',(req,res,next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result => {
        console.log(result)
    }).catch(err => console.log(err))
    res.status(201).json({
        createProduct: product
    })
})

router.get('/:productID',(req,res,next)=>{
    const id = req.params.productID;

    Product.findById(id).exec().
    then(doc => { 
        console.log(doc);
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({message: "product not found"})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    })

})
router.patch('/:productID',(req,res,next)=>{
    const id = req.params.productID;
    const props = req.body;
    Product.updateMany({_id:id},props).exec().then(result=>{
        res.status(200).json({message: 'updated with success',result: result})
    }).catch(err => console.log(err))
})

router.delete('/:productID',(req,res,next)=>{
    const id = req.params.productID;
    Product.remove({_id:id}).exec().
    then(res.status(200).json({message:`product ${id} deleted with success`}).catch(err => res.status(500).json({err})))
})



module.exports = router;
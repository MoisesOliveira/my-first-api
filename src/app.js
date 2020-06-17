const express = require('express');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders')
const morgan = require('morgan')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
//Setting CORS
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Origin','Origin, X-Request-With,Content-Type,Accept,Authorization')
    res.header('Content-Type: application/json')
if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE')
    res.status(200).json({
        message: "everything setted"
    })
    
}
next();
})
//MongoDB connection and settings
const mongoConnection = mongoose.connect('mongodb://localhost:27017/shopDB',{useNewUrlParser:true})
//Log all crud actions on API
app.use(morgan('dev'))
// body parser for post requests
app.use(bodyParser.json({type:'application/json'}))
//API routes
app.use('/orders',ordersRoute)
app.use('/products', productsRoute);

app.use((req,res,next)=>{
    const error = new Error('Not found')
    error.status = 404;
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;
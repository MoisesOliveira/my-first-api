const express = require('express');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders')
const morgan = require('morgan')
const app = express();

//Log all crud actions on API
app.use(morgan('dev'))

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
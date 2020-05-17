const express = require('express');
const app = express();
const productrouter = require('./routes/product');
const orderrouter = require('./routes/order');
const userrouter = require('./routes/user');
const loginrouter = require('./routes/login');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const AuthMiddleware = require('./jwt_middleware');
require('dotenv').config()

app.use(bodyParser.json());
mongoose.connect(
    "mongodb+srv://admin:admin@cluster0-hil44.mongodb.net/test?retryWrites=true&w=majority", 
    { useNewUrlParser: true })
.then((success)=>{
    console.log('SuccessFully connected!!!!!')
}).catch((error)=>{
    console.log("Error while connecting  to DB...", error)
})
app.use(AuthMiddleware);
app.use('/products', productrouter);
app.use('/orders', orderrouter);
app.use('/user', userrouter);
app.use('/login', loginrouter);

app.use((req,res,next)=>{
    const error =  new Error('Not valid');
    error.status = 404
    next(error);
});

// express error handler
app.use((error,req,res,next)=>{
    res.status(error.status)
    res.json({
        error:true,
        status:error.status,
        message:error.message
    })
})

app.listen(3000, ()=>{
    console.log('App running.......')
})

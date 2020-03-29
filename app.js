const express = require('express');
const app = express();
const productrouter = require('./routes/product');

app.use('/products', productrouter)

app.listen(3000, ()=>{
    console.log('App running.......')
})

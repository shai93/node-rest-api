const express = require('express');
const router = express.Router();
const data = [
    {
        id:1,
        name:'product1'
    },
    {
        id:2,
        name:'product2'
    },
    {
        id:3,
        name:'product3'
    }
];

router.get('/',(req, res, next)=>{
    res.status(200)
    res.json({
        error:false,
        message:data
    })
})

router.get('/:productid',(req, res, next)=>{
    let id = req.params.productid;
    let product = {};

    for(let i = 0 ; i< data.length; i++){
        if(data[i].id == id){
            product = data[i];
            break;
        }
    }

    if(Object.keys(product).length >0){
        res.json({
            error:false,
            product:product
        })
    }else{
        const error = new Error(`Product with id ${id} not found`)
        error.status = 500;
        next(error)
    }

})


router.post('/',(req, res, next)=>{
    res.status(200)
    res.json({
        error:false,
        message:"Success"
    })
})

module.exports = router

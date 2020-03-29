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
        data:data
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
        res.json({
            error:true,
            message:`Product with id ${id} not found`
        })
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

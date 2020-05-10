const express = require('express');
const router = express.Router();
const Order = require('../model/order');


router.get('/',async(req, res, next)=>{
    const response = {
        totalrecords:0,
        data:[]
    }

    try{
        await Order.find().populate("product").exec().then((data)=>{
            response.data = data;
            response.totalrecords = data.length
        })
        res.status = 200;
        res.json({
            error:false,
            orders:response
        })
    }catch(e){
        console.log(e)
    }
})


router.post('/',async (req, res, next)=>{
    const order = new Order(req.body);
    try{
       await order.save()
       res.status(200)
        res.json({
            error:false,
            message:"Success"
        })
    }catch(e){
        const error = new Error(e.message)
        if(e.name == "ValidationError"){
            error.status = 400;
        }else{
            error.status = 500;
        }
        next(error)
    }
})

module.exports = router

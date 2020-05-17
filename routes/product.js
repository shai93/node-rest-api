const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const AuthMiddleware = require('../jwt_middleware');
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

// exec

router.get('/',AuthMiddleware, async(req, res, next)=>{
    if(Object.keys(req.query).length > 0){
        Product.findById(req.query.id).exec().then((product)=>{
            res.status = 200
            res.json({
                error:false,
                totalrecords:Object.keys(req.query).length,
                product:product
            })
        }).catch((err)=>{
            const error = new Error(err)
            error.status = 500;
            next(error)
        })
    }else{
        const response = {
            totalrecords:0,
            data:[]
        }
    
        try{
            await Product.find().exec().then((data)=>{
                response.data = data;
                response.totalrecords = data.length
            })
            res.status = 200;
            res.json({
                error:false,
                message:response
            })
        }catch(e){
            console.log(e)
        }
    }
})

router.get('/:productid',(req, res, next)=>{
    // let id = req.params.productid;
    // console.log(id)
    // Product.findById(id).exec().then((product)=>{
    //     res.status = 200
    //     res.json({
    //         error:false,
    //         product:product
    //     })
    // }).catch((err)=>{
    //     const error = new Error(err)
    //     error.status = 500;
    //     next(error)
    // })
    
    // let product = {};

    // for(let i = 0 ; i< data.length; i++){
    //     if(data[i].id == id){
    //         product = data[i];
    //         break;
    //     }
    // }

    // if(Object.keys(product).length >0){
    //     res.json({
    //         error:false,
    //         product:product
    //     })
    // }else{
    //     const error = new Error(`Product with id ${id} not found`)
    //     error.status = 500;
    //     next(error)
    // }

})


router.post('/',async (req, res, next)=>{
    const product = new Product(req.body);
    try{
       await product.save()
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

router.delete('/:productid', (req,res,next)=>{
    const productId = req.params.productid
    Product.remove({_id:productId}).exec().then(()=>{
        res.status(200)
        res.json({
            error:false,
            message:"Successfully Deleted"
        })
    }).catch((e)=>{
        const error = new Error(e.message)
        error.status = 500;
        next(error)
    })
})

router.put('/:productid', (req,res,next)=>{
    const productId = req.params.productid;
    
    Product.update({_id:productId}, {$set:req.body}).exec().then(()=>{
        res.status(200)
        res.json({
            error:false,
            message:"Successfully Updated"
        })
    }).catch((e)=>{
        const error = new Error(e.message)
        error.status = 500;
        next(error)
    })
})


router.patch('/:productid', (req,res,next)=>{
    const productId = req.params.productid;
    let obj = {};
    obj[req.body.propName] = req.body.propValue

    Product.update({_id:productId}, {$set:obj}).exec().then(()=>{
        res.status(200)
        res.json({
            error:false,
            message:"Successfully Updated"
        })
    }).catch((e)=>{
        const error = new Error(e.message)
        error.status = 500;
        next(error)
    })
})

module.exports = router

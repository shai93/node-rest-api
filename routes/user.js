const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');


router.post('/',async (req, res, next)=>{
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err){
            res.status(500)
            res.json({
                error:true,
                message:"Auth Failed"
            })
        }else{
            req.body.password =  hash;
            console.log(req.body)
            const user  = new User(req.body);
            user.save().then(user=>{
                res.status(200);
                res.json({
                    error:false,
                    message:"User created successfully!"
                })
            }).catch(err=>{
                res.status(500)
                res.json({
                    error:true,
                    message:err
                })
            })
        }
    });
})


module.exports = router

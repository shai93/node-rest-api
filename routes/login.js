const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/',async (req, res, next)=>{
    User.find({email:req.body.email}).exec().then(user=>{
        bcrypt.compare(req.body.password, user[0]['password'], function(err, result) {
            if(err){
                res.status(500)
                res.json({
                    error:true,
                    message:"Password not found"
                })
            }
            if(result){
                let payload = {
                    email:req.body.email,
                    userid:user[0]['_id']
                }
                let secretOrPrivateKey = process.env.SECRETKEY
                let options = {
                    expiresIn:"1h"
                }
                jwt.sign(payload, secretOrPrivateKey, options, (err, token)=>{    
                    res.status(200)
                    res.json({
                        error:false,
                        message:token
                    })  
                })
  
            }else{
                res.status(404)
                res.json({
                    error:true,
                    message:"User not found"
                })
            }
        });

    }).catch(err=>{
        res.status(500)
        res.json({
            error:true,
            message:err
        })
    })






})


module.exports = router

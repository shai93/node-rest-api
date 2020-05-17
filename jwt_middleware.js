const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1]
            const result = jwt.verify(token, process.env.SECRETKEY);
            next();
        }else{
            res.status(404);
            res.json({
                error:true,
                message:"404 Unauthorized"
            })    
        }
    }catch(e){
        res.status(404);
        res.json({
            error:true,
            message:e
        })
    }
    // next()
}
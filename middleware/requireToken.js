const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const {jwtkey}  = require('../keys')


module.exports = (req,res,next)=>{
    //authorization = Bearer ajfdlkajfkd
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).send({error :"You must have logged In "})
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,jwtkey,async(err,payload)=>{
        if(err){
            return res.status(401).send({error:"You must have Logged In"})
        }
        const {userId} = payload;
        const user = await User.findById(userId)
        req.user = user
        next()
    })
}
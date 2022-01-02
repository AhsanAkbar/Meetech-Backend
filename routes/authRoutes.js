const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');


router.post('/signup',async (req,res)=>{
    const {fullName, email, dateOfBirth, password} = req.body;
try{
    const user = new User({fullName,email,dateOfBirth,password});
    await user.save();
    const token = jwt.sign({userId: user._id},jwtkey)
    res.send({token})
}
catch(err){
    return res.status(422).send(err.message)
}
})

router.post('/login',async (req,res)=>{
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(422).send({error:"Must Provide Email or Password"})
    }
    const user = await User.findOne({email})
    if (!user){
        return res.status(422).send({error: "Must Provide Email or Password"})
    }
    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id},jwtkey)
        res.send({token})
    }
    catch(err){
        return res.status(422).send({error:"Must provide Email or Password"})
    }
    
})



module.exports = router
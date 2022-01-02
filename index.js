const express = require('express');
const app = express()
const PORT = 3000;
const mongoose = require("mongoose");
const {mongoURL} = require('./keys');


require('./models/User');

const requireToken = require('./middleware/requireToken');
const authRoutes = require('./routes/authRoutes');
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(authRoutes)


mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error',(err)=>{
    console.log('error',err)
})

app.get('/',requireToken,(req,res)=>{
    res.send("Your Email  is " + req.user.email)
})

app.listen(PORT,()=>{
    console.log("server is up and running on port " + PORT)
})

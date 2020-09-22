
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();
const {MONGO_URI} =require("./config/keys");

const server = express();
const PORT = process.env.PORT || 5000;
server.use(cors());
server.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    // useUnifiedTopology:true
//
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Successfully connected to Database.....!!!!!!")
});

const todoRoute = require('./routes/todo');
const authRoute=require('./routes/Auth');
const postRoute=require('./routes/Post');
const userRoute=require("./routes/User");

server.use('/todo', todoRoute);
server.use('/auth',authRoute);
server.use('/post',postRoute);
server.use('/users',userRoute);

if(process.env.NODE_ENV === "production"){
    server.use(express.static('client/build'))
    const path=require('path');
    server.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

server.listen(PORT, () => {
    console.log("Server is listening to " + PORT)
})
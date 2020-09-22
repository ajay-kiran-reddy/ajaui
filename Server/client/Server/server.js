
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();

const server = express();
const PORT = 5000;
server.use(cors());
server.use(express.json());

mongoose.connect('mongodb://ajayreddy:pKslefKk8P60f3cw@clusterone-shard-00-00.khkay.mongodb.net:27017,clusterone-shard-00-01.khkay.mongodb.net:27017,clusterone-shard-00-02.khkay.mongodb.net:27017/tracker?ssl=true&replicaSet=atlas-tocsm6-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    // useUnifiedTopology:true
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
server.use('/users',userRoute)

server.listen(PORT, () => {
    console.log("Server is listening to " + PORT)
})



// server.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//
// });

// var server=express()
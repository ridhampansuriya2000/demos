const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

// const router = require("./router/appData2");
const router = require("./router");

// database connection
require('./mongo');

// modals
// require('./Modal/appData');

const cors = require('cors');
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(router);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

const port = 8080;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
});
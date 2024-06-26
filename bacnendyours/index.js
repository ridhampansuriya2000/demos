const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const router = require("./router");

// database connection
require('./mongo');

const cors = require('cors');
app.use(cors());


// Set EJS as the views engine
app.set('views engine', 'ejs');

// Serve static files (like stylesheets, images, etc.) if needed
app.use(express.static('public'));

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
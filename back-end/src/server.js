// Create express app
const express = require("express");
const routes = require('./routes');
const app = express()
const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);


app.listen(3333);

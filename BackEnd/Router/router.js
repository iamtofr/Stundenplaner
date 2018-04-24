'use strict';


const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const express = require('express');
const app = express.Router();
const schemas = require('../Schemas/schemas');




app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log(req.body);
    next();
});

let adress = mongoose.model('Adress', schemas.adress);

app.route('/')
    .get((req, res, next) => {
        adress.find({}, function (err, adress) {
            if (err) throw err;
            res.status(200).json(adress);
        });
    });



app.all('*', (req, res, next) => {
    res.status(404).set('Content-Type', 'text/html');

    // respond with html page
    if (req.accepts('html')) {
        res.send('404 Not found');
    }
    // respond with json
    else if (req.accepts('json')) {
        res.send('404 (json) Not found');
    }
    // default to plain-text
    else {
        res.send('404 (Text) Not found');
    }
});

module.exports = app;
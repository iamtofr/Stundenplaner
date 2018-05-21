'use strict';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const express = require('express');
const app = express.Router();
const schema = require('../Schemas/schemas');
let getPermission;

app.use(bodyParser.json());
app.use(function (req, res, next) {
    getPermission = permission(req);
    console.log(req.body);
    next();
});

let address = mongoose.model('address', schema.address);

//TODO PERMISSION
//TODO get all || verwalter
//TODO post || verwalter

app.route('/')
    .get((req, res, next) => {
            address.find({}, function (err, address) {
                if (err) throw err;
                res.status(200).json(address);
            });
    })

    .post((req, res, next) => {
        let newAddress = address(req.body);
        newAddress.save(function (err) {
            if (err) throw err;
            console.log('Address created!');
        });
        res.status(201).json(newAddress)
    });

app.route('/:id')
    .get((req, res, next) => {
        let query ={'_id': req.params.id};
        address.find(query, function (err, address) {
            if (err) throw err;
            res.status(200).json(address);
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
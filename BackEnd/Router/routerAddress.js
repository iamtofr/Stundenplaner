/**
 * This module defines the routes and HTTP Requests of address.
 * All HTTP Requests are validated with a permission before they are executed.
 * Mongoose is used as framework.
 *
 * @module routes/address
 * @type {Router}
 */

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
        if(req.perm >= permission.manager){
            address.find({}, function (err, address) {
                if (err) throw err;
                res.status(200).json(address);
            });
        } else {
            res.status(403).json("Unauthorized");
        }
    })

    .post((req, res, next) => {
        if(req.perm >= permission.manager){
            let newAddress = address(req.body);
            newAddress.save(function (err) {
                if (err) throw err;
                console.log('Address created!');
            });
            res.status(201).json(newAddress);
        } else {
            res.status(403).json("Unauthorized");
        }
    });

app.route('/:id')
    .get((req, res, next) => {
        if(req.Perm >= permission.teacher){
            let query ={'_id': req.params.id};
            address.find(query, function (err, address) {
                if (err) throw err;
                res.status(200).json(address);
            });
        } else {
            res.status(403).json("Unauthorized");
        }
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
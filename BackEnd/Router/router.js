'use strict';


const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const express = require('express');
const app = express.Router();

const schema = require('../Schemas/schemas');


app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log(req.body);
    next();
});

let profile = mongoose.model('profile', schema.profile);
let address = mongoose.model('address', schema.address);
let role = mongoose.model('role', schema.role);



app.route('/profile/')
    .get((req, res, next) => {
        profile.find({}, function (err, users) {
            if (err) throw err;
            res.status(200).json(users);
        });
    })
    .post((req, res, next) => {
        let newProfile = profile(req.body);
        let dateBirth = req.body.dateOfBirth.split(".");
        newProfile.dateOfBirth = new Date(dateBirth[2] + "-" + dateBirth[1] + "-" + dateBirth[0]);
        console.log(newProfile.dateOfBirth);
        newProfile.save(function (err) {
            if (err) throw err;
            console.log('Profile created!');
        });
        res.status(201).json(newProfile)
    });

app.route('/address/')
    .get((req, res, next) => {
        address.find({}, function (err, users) {
            if (err) throw err;
            res.status(200).json(users);
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
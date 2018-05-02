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
let role = mongoose.model('role', schema.studentRole);


app.route('/profile/')
    .get((req, res, next) => {
        role.find({}, function (err, role) {
            if (err) throw err;
            res.status(200).json(role);
        });
    })

    /**
     * dateBirth parsing to DateObject according to specifications of type Date in MongoDb
     */
    .post((req, res, next) => {
        let newProfile = profile(req.body);
        let dateBirth = req.body.dateOfBirth.split(".");
        newProfile.dateOfBirth = new Date(dateBirth[2] + "-" + dateBirth[1] + "-" + dateBirth[0]);
        role.find({_id: newProfile.role}, function(err, role){
            if (err) throw err;
        newProfile.role = role._id;
        });

        console.log(newProfile.dateOfBirth);
        newProfile.save(function (err) {
            if (err) throw err;
            console.log('Profile created!');
        });
        res.status(201).json(newProfile)
    });

app.route('/profile/:id')
    .get((req, res, next) => {
        let query ={'_id': req.params.id};
        profile.find(query, function (err, profile) {
            if (err) throw err;
            res.status(200).json(profile);
        });
    })
    .patch((req, res, next) => {
        console.log(req.body);
        let query = {'_id': req.body._id};
        profile.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, profile) {
            if (err) return res.send(500, {error: err});
            res.status(200).json(profile);
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
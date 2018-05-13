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

//TODO populate children fehlt noch auf role und address

let profile = mongoose.model('profile', schema.profile);

app.route('/')
    .get((req, res, next) => {
        profile.find({}, function (err, profile) {
            if (err) throw err;
            res.status(200).json(profile);
        });
    })

    /**
     * dateBirth parsing to DateObject according to specifications of type Date in MongoDb
     */
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
    })

    .patch((req, res, next) => {
        console.log(req.body);
        let query = {'_id': req.body._id};
        profile.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, profile) {
            if (err) return res.send(500, {error: err});
            res.status(200).json(profile);
        });
    });

//just for input subject array!!!!!!
// app.route('/fillDatabase')
//     .get((req, res, next) => {
//         subject.find({}, function (err, subject) {
//             if (err) throw err;
//             res.status(200).json(subject);
//         });
//     })
//
//     .post((req, res, next) => {
//         let input = req.body;
//         console.log(input.popopo);
//         for (let f of input.popopo){
//             var newSubject = new profile(f);
//             newSubject.save(function (err) {
//                 if (err) throw err;
//                 console.log('Subject created!');
//             });
//
//         }
//         res.status(201).json(newSubject)
//     });

app.route('/:id')
    .get((req, res, next) => {
        profile.
        findOne({ _id: req.params.id }).
        populate('role').populate('address').
        exec(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    })

    .delete((req,res,next)=>{
        profile.remove({ _id: req.params.id }, function (err) {
            if (err) return res.send(500, {error: err});
            res.status(200).json();
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
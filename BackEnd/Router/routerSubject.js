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

let subject = mongoose.model('subject', schema.subject);

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
//             var newSubject = new subject(f);
//             newSubject.save(function (err) {
//                 if (err) throw err;
//                 console.log('Subject created!');
//             });
//
//         }
//         res.status(201).json(newSubject)
//     });


app.route('/')
    .get((req, res, next) => {
        subject.find({}, function (err, subject) {
            if (err) throw err;
            res.status(200).json(subject);
        });
    })

    .post((req, res, next) => {
        let newSubject = subject(req.body);
        newSubject.save(function (err) {
            if (err) throw err;
            console.log('Subject created!');
        });
        res.status(201).json(newSubject)
    })

    .patch((req, res, next) => {
        let query = {'_id': req.body._id};
        subject.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, subject) {
            if (err) return res.send(500, {error: err});
            res.status(200).json(subject);
        });
    });


app.route('/:id')
    .get((req, res, next) => {
        let query ={'_id': req.params.id};
        subject.find(query, function (err, subject) {
            if (err) throw err;
            res.status(200).json(subject);
        });
    })

    .delete((req,res,next)=>{
        subject.remove({ _id: req.params.id }, function (err) {
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
        res.send('404 (json) Notsssss found');
    }
    // default to plain-text
    else {
        res.send('404 (Text) Not found');
    }
});

module.exports = app;
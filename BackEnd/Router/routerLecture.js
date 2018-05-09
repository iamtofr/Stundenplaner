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

let lecture = mongoose.model('lecture', schema.lecture);


app.route('/')
    .get((req, res, next) => {
        lecture.findAll({})
            .populate('teacher')
            .populate('room')
            .populate('course')
            .populate('subject')
            .populate('period')
            .exec(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    })

    .post((req, res, next) => {
        let newLecture = profile(req.body);
        newLecture.save(function (err) {
            if (err) throw err;
            console.log('Lecture created!');
        });
        res.status(201).json(newLecture)
    })

    .patch((req, res, next) => {
        let query = {'_id': req.body._id};
        lecture.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, lecture) {
            if (err) return res.send(500, {error: err});
            res.status(200).json(lecture);
        });
    });


app.route('/:id')
    .get((req, res, next) => {
        lecture.findOne({_id: req.params.id})
            .populate('teacher')
            .populate('room')
            .populate('course')
            .populate('subject')
            .populate('period').exec(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    })

    .delete((req,res,next)=>{
        lecture.remove({ _id: req.params.id }, function (err) {
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
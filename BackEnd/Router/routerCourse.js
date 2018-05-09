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

let course = mongoose.model('course', schema.course);


app.route('/')
    .get((req, res, next) => {
        course.findAll({}).populate('students').exec(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    })

    .post((req, res, next) => {
        let newCourse = profile(req.body);
        newCourse.save(function (err) {
            if (err) throw err;
            console.log('Course created!');
        });
        res.status(201).json(newCourse)
    })

    .patch((req, res, next) => {
        let query = {'_id': req.body._id};
        course.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, course) {
            if (err) return res.send(500, {error: err});
            res.status(200).json(course);
        });
    });


app.route('/:id')
    .get((req, res, next) => {
        course.findOne({_id: req.params.id}).populate('students').exec(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    })

.delete((req,res,next)=>{
    course.remove({ _id: req.params.id }, function (err) {
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
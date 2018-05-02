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

let student = mongoose.model('student', schema.student);

app.route('/student/')
    .get((req, res, next) => {
        student.find({}, function (err, student) {
            if (err) throw err;
            res.status(200).json(student);
        });
    })


    .post((req, res, next) => {
        let newStudent = student(req.body);
        newStudent.save(function (err) {
            if (err) throw err;
            console.log('Student created!');
        });
        res.status(201).json(newStudent)
    });








app.route('/student/:id')
    .get((req, res, next) => {
        let query ={'_id': req.params.id};
        student.find(query, function (err, student) {
            if (err) throw err;
            res.status(200).json(student);
        });
    })
    .patch((req, res, next) => {
        console.log(req.body);
        let query = {'_id': req.body._id};
        student.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, student) {
            if (err) return res.send(500, {error: err});
            res.status(200).json(student);
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
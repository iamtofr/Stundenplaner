'use strict';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const express = require('express');
const app = express.Router();
const permission = require('../Tools/permissions');
const schema = require('../Schemas/schemas');

app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log(req.body);
    next();
});

let course = mongoose.model('course', schema.course);


//TODO PERMISSION
//TODO get all || manager
//TODO get id || teacher
//TODO post || manager
//TODO delelte || manager
//TODO patch || manager

app.route('/')
    .get((req, res, next) => {
        if (req.perm >= permission.manager) {
            course.findAll({}).populate('students').exec(function (err, result) {
                if (err) throw err;
                res.status(200).json(result);
            });
        } else {
            res.status(403).json("Unauthorized");
        }
    })

    .post((req, res, next) => {
        if (req.perm >= permission.manager) {
            let newCourse = profile(req.body);
            newCourse.save(function (err) {
                if (err) throw err;
                console.log('Course created!');
            });
            res.status(201).json(newCourse);
        } else {
            res.status(403).json("Unauthorized");
        }
    })

    .patch((req, res, next) => {
        if (req.perm >= permission.manager) {
            let query = {'_id': req.body._id};
            course.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, course) {
                if (err) return res.send(500, {error: err});
                res.status(200).json(course);
            });
        } else {
            res.status(403).json("Unauthorized");
        }
    });


app.route('/:id')
    .get((req, res, next) => {
        if (req.perm >= permission.teacher) {
            course.findOne({_id: req.params.id}).populate('students').exec(function (err, result) {
                if (err) throw err;
                res.status(200).json(result);
            });
        } else {
            res.status(403).json("Unauthorized");
        }
    })

    .delete((req, res, next) => {
        if (req.perm >= permission.manager) {
            course.remove({_id: req.params.id}, function (err) {
                if (err) return res.send(500, {error: err});
                res.status(200).json();
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
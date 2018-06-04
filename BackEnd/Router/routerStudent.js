/**
 * This module defines the routes and HTTP Requests of students.
 * All HTTP Requests are validated with a permission before they are executed.
 * Mongoose is used as framework.
 *
 * @module routes/student
 * @type {Router}
 */

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

let student = mongoose.model('student', schema.student);

/**
 * HTTP Requests for Address Routes
 */
app.route('/')
    .get((req, res, next) => {
        if(req.perm >= permission.teacher){
            student.findAll({}).populate('profile').exec(function (err, result) {
                if (err) throw err;
                res.status(200).json(result);
            });
        } else {
            res.status(403).json("Unauthorized");
        }
    })

    .post((req, res, next) => {
        if(req.perm >= permission.manager){
            let newStudent = profile(req.body);
            newStudent.save(function (err) {
                if (err) throw err;
                console.log('Student created!');
            });
            res.status(201).json(newStudent);
        } else {
            res.status(403).json("Unauthorized");
        }
    })

    .patch((req, res, next) => {
        if(req.perm >= permission.manager){
            let query = {'_id': req.body._id};
            student.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, student) {
                if (err) return res.send(500, {error: err});
                res.status(200).json(student);
            });
        } else {
            res.status(403).json("Unauthorized");
        }
    });

/**
 * HTTP Requests for Address Routes by id
 */
app.route('/:id')
    .get((req, res, next) => {
        if(req.perm >= permission.student){
            student.findOne({_id: req.params.id}).populate('profile').exec(function (err, result) {
                if (err) throw err;
                res.status(200).json(result);
            });
        } else {
            res.status(403).json("Unauthorized");
        }
    })

    .delete((req,res,next)=>{
        if(req.perm >= permission.manager){
            student.remove({ _id: req.params.id }, function (err) {
                if (err) return res.send(500, {error: err});
                res.status(200).json();
            });
        } else {
            res.status(403).json("Unauthorized");
        }
    });


/**
 * Error Requests of wrong accept types
 */
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
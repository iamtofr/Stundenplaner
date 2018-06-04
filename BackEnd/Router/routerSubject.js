/**
 * This module defines the routes and HTTP Requests of subjects.
 * All HTTP Requests are validated with a permission before they are executed.
 * Mongoose is used as framework.
 *
 * @module routes/subject
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

/**
 * HTTP Requests for Address Routes
 */
app.route('/')
    .get((req, res, next) => {
        if (req.perm >= permission.manager) {
            subject.find({}, function (err, subject) {
                if (err) throw err;
                res.status(200).json(subject);
            });
        } else {
            res.status(403).json("Unauthorized");
        }
    })

    .post((req, res, next) => {
        if (req.perm >= permission.manager) {
            let newSubject = subject(req.body);
            newSubject.save(function (err) {
                if (err) throw err;
                console.log('Subject created!');
            });
            res.status(201).json(newSubject);
        } else {
            res.status(403).json("Unauthorized");
        }
    })

    .patch((req, res, next) => {
        if (req.perm >= permission.manager) {
            let query = {'_id': req.body._id};
            subject.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, subject) {
                if (err) return res.send(500, {error: err});
                res.status(200).json(subject);
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
        if (req.perm >= permission.teacher) {
            let query = {'_id': req.params.id};
            subject.find(query, function (err, subject) {
                if (err) throw err;
                res.status(200).json(subject);
            });
        } else {
            res.status(403).json("Unauthorized");
        }
    })

    .delete((req, res, next) => {
        if (req.perm >= permission.manager) {
            subject.remove({_id: req.params.id}, function (err) {
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
        res.send('404 (json) Notsssss found');
    }
    // default to plain-text
    else {
        res.send('404 (Text) Not found');
    }
});

module.exports = app;
/**
 * This module defines the routes and HTTP Requests of periods.
 * Mongoose is used as framework.
 *
 * @module routes/period
 * @type {Router}
 */

'use strict';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const express = require('express');
const app = express.Router();
const schema = require('../Schemas/schemas');

app.use(bodyParser.json());

let period = mongoose.model('period', schema.period);

app.route('/')
    .get((req, res, next) => {
        period.find({}, function (err, period) {
            if (err) throw err;
            res.status(200).json(period);
        });
    })

    .post((req, res, next) => {
        let periodList = req.body;
        for (let p of periodList) {
            let newPeriod = period(p);
            newPeriod.save(function (err) {
                if (err) throw err;
                console.log('Period created!');
            });
        }
        res.status(201).json(newPeriod)
    });

app.route('/:id')
    .get((req, res, next) => {
        let query = {'_id': req.params.id};
        period.find(query, function (err, period) {
            if (err) throw err;
            res.status(200).json(period);
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
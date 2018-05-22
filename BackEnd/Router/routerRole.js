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

let role = mongoose.model('role', schema.role);


//TODO PERMISSION
//TODO get all || manager
//TODO get id || student
//TODO post || manager
//TODO delete || manager
//TODO patch || manager


app.route('/')
    .get((req, res, next) => {
        role.find({}, function (err, role) {
            if (err) throw err;
            res.status(200).json(role);
        });
    })

    .post((req, res, next) => {
        let newRole = role(req.body);
        newRole.save(function (err) {
            if (err) throw err;
            console.log('Role created!');
        });
        res.status(201).json(newRole)
    })

    .patch((req, res, next) => {
        let query = {'_id': req.body._id};
        role.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, role) {
            if (err) return res.send(500, {error: err});
            res.status(200).json(role);
        });
    });

app.route('/:id')
    .get((req, res, next) => {
        let query = {'_id': req.params.id};
        role.find(query, function (err, role) {
            if (err) throw err;
            res.status(200).json(role);
        })
    })

    .delete((req, res, next) => {
        role.remove({_id: req.params.id}, function (err) {
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
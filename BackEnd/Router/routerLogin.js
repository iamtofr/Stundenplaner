'use strict';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const express = require('express');
const app = express.Router();

// let permissionChecker = require('./permissionChecker');
const schema = require('../Schemas/schemas');

app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log(req.body);
    next();
});
let account = mongoose.model('account', schema.account);

app.route('/')
    .get((req, res, next) => {
        // permissionChecker(req.query.t);
        // console.log(permissionChecker(1234));

        //TODO body must be checked if user/passwd is present and match with db entry
        account.find({}, function (err, account) {
            if (err) throw err;
            res.status(200).json(account);
        });
    })

    .post((req, res, next) => {
        let newAccount = account(req.body);
        newAccount.save(function (err) {
            if (err) throw err;
            console.log('Account created!');
        });
        res.status(201).json(newAccount)
    });




app.route('/test/:id')
    .get((req, res, next) => {
        account.
        findOne({ _id: '5af2cbb912ce600ec322e82a' }).
        populate('profile').
        exec(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    });



app.route('/:id')
    .get((req, res, next) => {
        account.
        findOne({ _id: req.params.id }).
        populate('profile').
        exec(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    })

    .patch((req, res, next) => {

        //TODO body must be checked if user/passwd is present and match with db entry
        let query = {'_id': req.params.id};
        account.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, account) {
            if (err) return res.send(500, {error: err});
            res.status(200).json(account);
        });
    })

    .delete((req,res,next)=>{

        //TODO body must be checked if user/passwd is present and match with db entry
        account.remove({ _id: req.params.id }, function (err) {
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
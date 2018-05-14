'use strict';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const express = require('express');
const app = express.Router();

// let permissionChecker = require('./permissionChecker');
const schema = require('../Schemas/schemas');

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.body);
    next();
});
let account = mongoose.model('account', schema.account);
let profile = mongoose.model('profile', schema.profile);


//TODO PERMISSION
//TODO get all || admin
//TODO post || verwalter
//TODO patch || admin

app.route('/')
    .get((req, res, next) => {
        account.findOne({})
            .exec(function (err, resultAccount) {
                let newProfile = profile.findById(resultAccount.profile);
                newProfile
                    .populate('role')
                    .populate('address')
                    .exec(function (err, result) {
                        if (err) throw err;
                        resultAccount.profile = result;
                        res.status(200).json(resultAccount);
                    });
            });
    })

    .patch((req, res, next) => {

        let query = {'_id': req.body.id};
        account.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, account) {
            if (err) return res.send(500, {error: err});
            res.status(200).json(account);
        });
    })

    .post((req, res, next) => {
        account.findOne({'username': req.body.username}).populate('profile').exec(function (err, result) {
            if (err) throw err;
            if (result === null) {
                let newAccount = account(req.body);
                newAccount.save(function (err) {
                    if (err) throw err;
                    res.status(201).json(newAccount);
                })
            } else if (req.body.password === result.password) {
                res.status(200).json(result);
            } else res.status(401).json();

        });
    });


app.route('/:id')
    .get((req, res, next) => {
        account.findById(req.params.id)
            .exec(function (err, resultAccount) {
                let newProfile = profile.findById(resultAccount.profile);
                newProfile
                    .populate('role')
                    .populate('address')
                    .exec(function (err, result) {
                        if (err) throw err;
                        resultAccount.profile = result;
                        res.status(200).json(resultAccount);
                    });
            });
    })


    .delete((req, res, next) => {

        //TODO body must be checked if user/passwd is present and match with db entry
        account.remove({_id: req.params.id}, function (err) {
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
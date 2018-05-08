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

let account = mongoose.model('profile', schema.account);

app.route('/')
    .get((req, res, next) => {

        //TODO body must be checked if user/passwd is present and match with db entry
        account.find({}, function (err, account) {
            if (err) throw err;
            res.status(200).json(account);
        });
    })

    /**
     * dateBirth parsing to DateObject according to specifications of type Date in MongoDb
     */
    .post((req, res, next) => {
        let newAccount = profile(req.body);
        newAccount.save(function (err) {
            if (err) throw err;
            console.log('Profile created!');
        });
        res.status(201).json(newAccount)
    })

    .patch((req, res, next) => {

        //TODO body must be checked if user/passwd is present and match with db entry
        console.log(req.body);
        let query = {'_id': req.body._id};
        account.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, account) {
            if (err) return res.send(500, {error: err});
            res.status(200).json(account);
        });
    });



app.route('/:id')
    .get((req, res, next) => {

        //TODO body must be checked if user/passwd is present and match with db entry
        let query ={'_id': req.params.id};
        account.find(query, function (err, account) {
            if (err) throw err;
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
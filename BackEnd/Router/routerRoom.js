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

let room = mongoose.model('room', schema.room);


//TODO Router

app.route('/')
    .get((req, res, next) => {
        room.find({}).exec(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    })

    .post((req, res, next) => {
        let newRoom = room(req.body);
        newRoom.save(function (err) {
            if (err) throw err;
            console.log('Room created!');
        });
        res.status(201).json(newRoom)
    })

    .patch((req, res, next) => {
        let query = {'_id': req.body._id};
        room.findOneAndUpdate(query, req.body, {upsert: true, new: true}, function (err, room) {
            if (err) return res.send(500, {error: err});
            res.status(200).json(room);
        });
    });


app.route('/:id')
    .get((req, res, next) => {
        room.findOne({_id: req.params.id}).exec(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    })

    .delete((req,res,next)=>{
        room.remove({ _id: req.params.id }, function (err) {
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
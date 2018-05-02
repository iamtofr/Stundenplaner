'use strict';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testDB');
const express = require('express');
const app = express.Router();
let Schema = mongoose.Schema;


app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log(req.body);
    next();
});

let personSchema = new Schema({
    name: {type: String, required: false},
    vorname: {type: String, required: false},
    city: {type: Schema.Types.ObjectId, ref:'city', required: true}
});

let citySchema = new Schema({
    name: {type: String, required: false},
    staat: {type: String, required: false},
    land: {type: String, required: false}
});

let Person = mongoose.model('person', personSchema);
let City = mongoose.model('city', citySchema);


app.route('/person/')
    .get((req, res, next) => {
        Person.
        findOne({_id: '5aea10717f15fb2a0fc964ee'}).
        populate('city').
        exec(function (err, person){
            res.status(200).json(person)
        });
    })

    .post((req, res, next) => {
        let newPerson = Person(req.body);
        console.log(newPerson);
        newPerson.save(function (err) {
            if (err) throw err;
            console.log('Person created!');
        });
        res.status(201).json(newPerson)
    });


app.route('/city/')
    .get((req, res, next) => {
        City.find({}, function (err, city) {
            if (err) throw err;
            res.status(200).json(city);
        });
    })

    .post((req, res, next) => {
        let newCity = City(req.body);
        console.log(newCity);
        newCity.save(function (err) {
            if (err) throw err;
            console.log('City created!');
        });
        res.status(201).json(newCity)
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
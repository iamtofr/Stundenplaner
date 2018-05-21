'use strict';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const express = require('express');
const app = express.Router();

const schema = require('../Schemas/schemas');

const fs = require('fs');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/shray.de-0001/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/shray.de-0001/cert.pem', 'utf8');


const credentials = {key: privateKey, cert: certificate};
const http = require('http');
const https = require('https');

app.use(bodyParser.json());
app.use(function (req, res, next) {
    next();
});


// let personSchema = new Schema({
//     name: {type: String, required: false},
//     vorname: {type: String, required: false},
//     city: {type: Schema.Types.ObjectId, ref:'city', required: true}
// });
//
// let citySchema = new Schema({
//     name: {type: String, required: false},
//     staat: {type: String, required: false},
//     land: {type: String, required: false}
// });

let Student = mongoose.model('student', schema.student);
let Subject = mongoose.model('subject', schema.subject);
let Profile = mongoose.model('profile', schema.profile);
// let Person = mongoose.model('person', personSchema);
// let City = mongoose.model('city', citySchema);

app.route('/testcreate/')
    .get((req, res, next) => {
        Profile.find({}).exec(function (err, profile) {
            res.status(200).json(profile)
        });
    })
    // .post((req, res, next) => {
    //     Subject.find({}).exec(function (err, profiles) {
    //         for (let currProfile of profiles) {
    //             let currentStudent = new Student({profile: currProfile._id });
    //             currentStudent.save(function (err) {
    //                 if (err) throw err;
    //             });
    //         }
    //     });
    // });

    // .post((req, res, next) => {
    //     Profile.find({}).limit(1).exec(function (err, profiles) {
    //         for (let currProfile of profiles) {
    //             let currentStudent = new Student({profile: currProfile._id });
    //             currentStudent.save(function (err) {
    //                 if (err) throw err;
    //             });
    //         }
    //     });
    // });


    // app.route('/person/')
    //     .get((req, res, next) => {
    //         Person.
    //         findOne({name: 'Frank'}).
    //         populate('city').
    //         exec(function (err, person){
    //             res.status(200).json(person)
    //         });
    //     })
    //
    .post((req, res, next) => {
        let newPersonList = req.body;
        console.log(newPersonList.input[1]);
        console.log(newPersonList.input.length());
        for (let currProfile of newPersonList.input) {
            var newprofile = new Profile(currProfile);
            newprofile.save(function (err) {
                if (err) console.log(err);
                res.status(201).json(newprofile)
            });
        }


    });


// app.route('/city/')
//     .get((req, res, next) => {
//         City.find({}, function (err, city) {
//             if (err) throw err;
//             res.status(200).json(city);
//         });
//     })
//
//     .post((req, res, next) => {
//         let newCity = City(req.body);
//         console.log(newCity);
//         newCity.save(function (err) {
//             if (err) throw err;
//             console.log('City created!');
//         });
//         res.status(201).json(newCity)
//     });
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
const serverHttps = https.createServer(credentials, app);

serverHttps.listen(4433, '85.214.37.34', (err) => {
    if (err !== undefined) {
        console.log('Error on startup: ${err}');
    }
    else {
        console.log('Listening on port 4433');
    }
});

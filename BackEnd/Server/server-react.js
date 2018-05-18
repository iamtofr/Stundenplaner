"use strict";

const fs = require('fs');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/stundenplaner.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/stundenplaner.online/cert.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const app = express();
const http = require('http');
const https = require('https');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/', express.static('/var/www/stundenplaner/FrontEnd/build'));

//app.use('/static', express.static('/var/www/stundenplaner/BackEnd/SSL-CertInstall/.well-known/acme-challenge/test'));

// app.route('/')
//     .get((req, res, next) => {
//         res.send('/var/www/stundenplaner/BackEnd/SSL-CertInstall/.well-known/')
//     });
//api.stundenplaner.online, stundenplaner.online


const server = http.createServer(app);


server.listen(80, '85.214.37.34', (err) => {
    if (err !== undefined) {
        console.log('Error on startup: ${err}');
    }
    else {
        console.log('Listening on port 80');
    }
});



const serverHttps = https.createServer(credentials, app);

serverHttps.listen(443, '85.214.37.34', (err) => {
    if (err !== undefined) {
        console.log('Error on startup: ${err}');
    }
    else {
        console.log('Listening on port 443');
    }
});



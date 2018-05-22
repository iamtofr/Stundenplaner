"use strict";

const fs = require('fs');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/chain.pem', 'utf8');
const dhparam = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/dhparam4096.pem');

const credentials = { key: privateKey, cert: certificate, ca: ca, dhparam: dhparam };
const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const helmet = require('helmet');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(helmet());

app.use('/', express.static('/var/www/stundenplaner/FrontEnd/build'));

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
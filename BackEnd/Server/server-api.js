"use strict";

const fs = require('fs');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/chain.pem', 'utf8');
const dhparam = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/dhparam.pem');

const credentials = { key: privateKey, cert: certificate, ca: ca, dhparam: dhparam };
const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const helmet = require('helmet');

const routerPermissionControll = require('../Router/routerPermission');
const routerProfile = require('../Router/routerProfile');
const routerAddress = require('../Router/routerAddress');
const routerCourse = require('../Router/routerCourse');
const routerLecture = require('../Router/routerLecture');
const routerRoom = require('../Router/routerRoom');
const routerStudent = require('../Router/routerStudent');
const routerSubject = require('../Router/routerSubject');
const routerTeacher = require('../Router/routerTeacher');
const routerRole = require('../Router/routerRole');
const routerLogin = require('../Router/routerLogin');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(helmet());

app.use('/login', routerLogin);

app.use(routerPermissionControll);
app.use('/profile', routerProfile);
app.use('/subject', routerSubject);
app.use('/role', routerRole);
app.use('/course', routerCourse);
app.use('/lecture', routerLecture);
app.use('/room', routerRoom);
app.use('/student', routerStudent);
app.use('/teacher', routerTeacher);
app.use('/address', routerAddress);

const server = http.createServer(app);

server.listen(5080, '85.214.37.34', (err) => {
  if (err !== undefined) {
    console.log('Error on startup: ${err}');
  }
  else {
    console.log('Listening on port 80');
  }
});

const serverHttps = https.createServer(credentials, app);

serverHttps.listen(5443, '85.214.37.34', (err) => {
  if (err !== undefined) {
    console.log('Error on startup: ${err}');
  }
  else {
    console.log('Listening on port 443');
  }
});
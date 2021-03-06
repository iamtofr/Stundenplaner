"use strict";

const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const express = require('express');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/cert.pem', 'utf8');
const chain = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/chain.pem', 'utf8');
const dhparam = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/dhparam4096.pem');
const credentials = { key: privateKey, cert: certificate, ca: chain, dhparam: dhparam };

const app = express();
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

const cors = require('../Tools/cors');
app.use(cors);

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

const serverHttps = https.createServer(credentials, app);

serverHttps.listen(5443, '85.214.37.34', (err) => {
  if (err !== undefined) {
    console.log('Error on startup: ${err}');
  }
  else {
    console.log('Listening on port 443');
  }
});



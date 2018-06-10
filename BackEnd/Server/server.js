"use strict";

const fs = require('fs');
const WebSocket = require('ws');
const express = require('express');
const https = require('https');
const helmet = require('helmet');
const toAlgorithm = require('../Tools/collectDataForAlgo');
const WebsocketClient = require('./client');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const Schema = require('../Schemas/schemas');
const period = mongoose.model('period', Schema.period);
const Curriculum = mongoose.model('curiculum', Schema.curriculum);
const populateCurriculum = require('../Tools/populateCurriculum');


const app = express();

/**
 * SSL
 */
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/chain.pem', 'utf8');
const dhparam = fs.readFileSync('/etc/letsencrypt/live/www.stundenplaner.online/dhparam4096.pem');
const credentials = { key: privateKey, cert: certificate, ca: ca, dhparam: dhparam };

const routerPermissionControll = require('../Router/routerPermission');
const routerProfile = require('../Router/routerProfile');
const routerAddress = require('../Router/routerAddress');
const routerPeriod = require('../Router/routerPeriod');
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

app.use('/', express.static('/var/www/stundenplaner/FrontEnd/build'));

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
app.use('/period', routerPeriod);


/**
 * HTTPS Server
 */
const server = https.createServer(credentials, app);

/**
 * Websocket Server
 */
const wss = new WebSocket.Server({ server });

server.listen(443, '85.214.37.34', (err) => {
  if (err !== undefined) {
    console.log('Error on startup: ${err}');
  }
  else {
    console.log('Listening on port 443');
  }
});

wss.on('connection', function connection(ws) {
  console.log('connected');
  ws.on('message', function incoming(message) {
    toAlgorithm.buildAlgorithm().then((schoolData) => {
      let websocketClient = new WebsocketClient(schoolData, (resolvedSchoolData) => {
        console.log("11111111111 From Algo incoming: ", resolvedSchoolData);
        let newCurriculum = Curriculum(resolvedSchoolData);

        newCurriculum.save(function(err) {
          if (err) throw err;
          console.log('Curriculum created!');
        });

        let populated = populateCurriculum.build(newCurriculum);

        ws.send(JSON.stringify(populated));
      });
    });
  })
});
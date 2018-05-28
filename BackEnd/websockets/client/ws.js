//Client

const WebSocket = require('ws');
const fs = require('fs');

function sendMessage(type, data) {
    if (data) {
        var msg = {
            msgType: type,
            data: data
        };
    } else {
        var msg = {
            msgType: type,
            data: null
        };
    }
    console.log("sending message ",JSON.stringify(msg, null, 1));
    ws.send(JSON.stringify(msg));
}

const GET_LECTURES = "getLectures";
const CONNECTION_STATUS = "connectionStatus";
const SCHEDULE_DATA = "scheduleData";
const ERROR = "msgError";

//const ws = new WebSocket('wss://d3a7394e.ngrok.io/api.stundenplaner.online/', {
//const ws = new WebSocket('ws://192.168.0.48:9000/api.stundenplaner.online/', {
  const ws = new WebSocket('ws://10.48.205.33:9000/api.stundenplaner.online/', {
//const ws = new WebSocket('ws://141.64.174.15:9000/api.stundenplaner.online/', {
    origin: 'https://websocket.org'
});

var data = fs.readFileSync('schoolDataCourse.json', 'utf8');
var jsonData = JSON.parse(data);
var schoolData = JSON.stringify(jsonData);

ws.on('open', function open() {
    console.log('connection is open');
});

ws.on('close', function close() {
    console.log('disconnected');
});

ws.on('message', function incoming(incMessage) {

    try {
        var serverMessage = JSON.parse(incMessage);
    } catch (err) {
      sendMessage(ERROR, "incorrect message structure. Only json supported.");
        console.error(err);
    }
    if (serverMessage) {

        switch (serverMessage.msgType) {
            case CONNECTION_STATUS:
                if (serverMessage.data == "algorithmServerReady") {
                    sendMessage(GET_LECTURES, schoolData);
                } else {
                    throw new Error("Wrong server");
                }
                break;
            case SCHEDULE_DATA:
                if (serverMessage.data) {
                    try {
                      console.log(serverMessage.data);
                        var incJson = JSON.parse(serverMessage.data);
                        var icnJsonStr = JSON.stringify(incJson);
                        fs.writeFile('schedule.json', icnJsonStr, 'utf8', function () {
                          console.log ('File saved to schedule.json');
                        });
                    } catch (err) {
                      console.log(serverMessage.data.toString());
                        console.error("failing on SCHEDULE_DATA",err);
                        break;
                    }
                } else {
                    sendMessage(ERROR, "no schedule data");
                }
                break;
            default:
                sendMessage(ERROR, "unsupported command " + serverMessage.msgType.toString());
        }
    }
});

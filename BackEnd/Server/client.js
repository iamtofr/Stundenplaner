//Client
const WebSocket = require('ws');

const GET_LECTURES = "getLectures";
const CONNECTION_STATUS = "connectionStatus";
const SCHEDULE_DATA = "scheduleData";
const ERROR = "msgError";
let ws;

class WebsocketClient {
  constructor(schoolData, dataCallback) {
    ws = new WebSocket('ws://localhost:9000/api.stundenplaner.online/', {
      origin: 'https://websocket.org'
    });

    ws.on('open', function open() {
      console.log('connection is open');
    });

    ws.on('close', function close() {
      console.log('disconnected');
    });

    ws.on('message', (incMessage) => {

      try {
        var serverMessage = JSON.parse(incMessage);
      }
      catch (err) {
        this.sendMessage(ERROR, "incorrect message structure. Only json supported.");
        console.error(err);
      }
      if (serverMessage) {
        switch (serverMessage.msgType) {
          case CONNECTION_STATUS:
            if (serverMessage.data === "algorithmServerReady") {
              this.sendMessage(GET_LECTURES, schoolData);
            } else {
              throw new Error("Wrong server");
            }
            break;
          case SCHEDULE_DATA:
            if (serverMessage.data) {
              try {
                let serverData = serverMessage.data;
                console.log("Server-data:", serverData);
                dataCallback(serverData);
              }
              catch (err) {
                console.error("failing on SCHEDULE_DATA", err);
                break;
              }
            } else {
              this.sendMessage(ERROR, "no schedule data");
            }
            break;
          default:
            this.sendMessage(ERROR, "unsupported command " + serverMessage.msgType.toString());
        }
      }
    });
  }


  sendMessage(type, data) {
    var msg = {
      msgType: type,
      data: data
    };
    console.log("sending message ", JSON.stringify(msg, null, 1));
    ws.send(JSON.stringify(msg));
  }
}

module.exports = WebsocketClient;
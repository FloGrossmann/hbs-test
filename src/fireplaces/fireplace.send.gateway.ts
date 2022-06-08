import {  WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import * as fs from 'fs';
const hbs = require('hbs')
hbs.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FirePlaceSendGateway {
  constructor() {
    let templateStr = fs.readFileSync("./views/fireplaces.hbs").toString('utf-8');
    this.template = hbs.handlebars.compile(templateStr, {})
  }

  template: any;

  @WebSocketServer() server: Server;

  send(firePlaces) {
    let html = this.template({ firePlaces: firePlaces })
    this.server.emit('msgToClient', html);
  }

  sendWon() {
    this.server.emit('msgToClientWin', true)
  }

  restart() {
    this.server.emit("msgToClientRestart", true);
  }
}

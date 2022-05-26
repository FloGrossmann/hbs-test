import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';
import * as fs from 'fs';
import { FirePlaceService } from './fireplace.service';
const hbs = require('hbs')

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
    let html = this.template({firePlaces: firePlaces})
    this.server.emit('msgToClient', html);
  }

  sendWon() {
    this.server.emit('msgToClientWin', true)
  }

  restart() {
      this.server.emit("msgToClientRestart", true);
  }
}

import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';
import * as fs from 'fs';
import { FirePlaceService } from './fireplace.service';
import { FirePlaceSendGateway } from './fireplace.send.gateway';
const hbs = require('hbs')

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FirePlacesGateway {
  constructor(private readonly firePlaceService: FirePlaceService) {
    let templateStr = fs.readFileSync("./views/fireplaces.hbs").toString('utf-8');
    this.template = hbs.handlebars.compile(templateStr, {})
  }

  template: any;

  @WebSocketServer() server: Server;

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: number): Promise<void> {
    this.firePlaceService.updateFirePlace(payload);
  }
}

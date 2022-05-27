import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { FirePlaceSendGateway } from './fireplace.send.gateway';

export interface IFirePlace {
  value: boolean,
  class: string,
  index: number
}

@Injectable()
export class FirePlaceService {
  firePlaces: IFirePlace[] = [];
  numberOfFirePots = 20;
  finished: boolean = false;
  @WebSocketServer() server: Server;

  constructor(private readonly firePlaceSendGateway: FirePlaceSendGateway) {
    this.initFirePlaces();
  }

  restartWithNumberOfPots(pots: number) {
    this.numberOfFirePots = pots;
    this.firePlaces = [];
    this.finished = false;
    this.initFirePlaces();
    this.firePlaceSendGateway.send(this.firePlaces);
    this.firePlaceSendGateway.restart();
  }

  initFirePlaces() {
    for (let i = 0; i < this.numberOfFirePots; i++) {
      let on = Math.round(Math.random()) === 1;
      this.firePlaces.push({
        value: on,
        index: i,
        class: on ? 'firepot firepot-on' : 'firepot firepot-off'
      });
    }
    this.shuffleArray(this.firePlaces);
  }

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  toggleFirePlace(fireplace: IFirePlace) {
    fireplace.value = !fireplace.value;
    fireplace.class = fireplace.value ? 'firepot firepot-on' : 'firepot firepot-off';
  }

  updateFirePlace(index: number) {
    if (this.finished) {
      return this.firePlaces;
    }
    // Go to the given index, then flip every boolean value after it
    for (let fireplace of this.firePlaces) {
      if (fireplace.index >= index) {
        this.toggleFirePlace(fireplace);
      }
    }
    this.firePlaceSendGateway.send(this.firePlaces);
    if (this.checkIfWon()) {
      this.firePlaceSendGateway.sendWon();
    } 
  }

  checkIfWon() {
    let checkArr = this.firePlaces.filter((pot) => pot.value);
    if (checkArr.length === 0) {
      this.finished = true;
      return true;
    }
    return false;
  }

  getFirePlaces() {
    return this.firePlaces;
  }
}

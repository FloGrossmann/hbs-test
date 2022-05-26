import { Injectable } from '@nestjs/common';

export interface IFirePlace {
  value: boolean,
  image: string,
  index: number
}

@Injectable()
export class AppService {
  firePlaces: IFirePlace[] = [];
  numberOfFirePots = 20;

  constructor() {
    this.initFirePlaces();
  }

  initFirePlaces() {
    for (let i = 0; i < this.numberOfFirePots; i++) {
      let on = Math.round(Math.random()) === 1;
      this.firePlaces.push({
        value: on,
        image: on ? 'firepot-on.png' : 'firepot-off.png',
        index: i
      });
    }
    this.shuffleArray(this.firePlaces);
    console.log(this.firePlaces)
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
    fireplace.image = fireplace.value ? 'firepot-on.png' : 'firepot-off.png';
  }

  updateFirePlace(index: number) {
    // Go to the given index, then flip every boolean value after it
    for (let fireplace of this.firePlaces) {
      if (fireplace.index >= index) {
        this.toggleFirePlace(fireplace);
      }
    }
    return this.firePlaces;
  }

  getFirePlaces() {
    return this.firePlaces;
  }
}

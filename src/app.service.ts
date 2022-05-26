import { Injectable } from '@nestjs/common';

export interface IFirePlace {
  value: boolean,
  image: string,
  index: number
}

@Injectable()
export class AppService {
}

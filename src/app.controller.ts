import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { FirePlaceService } from './fireplaces/fireplace.service';

@Controller()
export class AppController {
  constructor(private readonly firePlaceService: FirePlaceService) {}

  @Get()
  @Render('index')
  root() {
    return { firePlaces: this.firePlaceService.getFirePlaces() };
  }
}

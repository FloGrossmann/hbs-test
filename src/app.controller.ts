import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';

interface HBSResponse extends Response {
  render: (path, context) => {}
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { firePlaces: this.appService.getFirePlaces() };
  }

  @Post('update')
  updateArray(@Res() res: HBSResponse, @Body() body: any) {
    let firePlaces = this.appService.updateFirePlace(body.index);
    return res.render('../views/fireplaces.hbs', {firePlaces: firePlaces})
  }
}

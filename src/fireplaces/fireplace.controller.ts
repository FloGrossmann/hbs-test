import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { FirePlaceService } from './fireplace.service';

interface HBSResponse extends Response {
  render: (path, context) => {}
}

@Controller("fireplace")
export class FirePlaceController {
  constructor(private readonly firePlaceService: FirePlaceService) {}

  @Get()
  @Render('index')
  root() {
    return { firePlaces: this.firePlaceService.getFirePlaces() };
  }

  @Post('update')
  updateArray(@Res() res: HBSResponse, @Body() body: any) {
    let firePlaces = this.firePlaceService.updateFirePlace(body.index);
    return res.render('../views/fireplaces.hbs', {firePlaces: firePlaces})
  }

  @Post('setup')
  restart(@Res() res: any, @Body() body: any) {
    console.log("SETUP", body)
    if (body.number) {
      this.firePlaceService.restartWithNumberOfPots(body.number);
      return res.json(body);
    }
    return res.json({error: "number missing"});
  }
}


import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var cors = require('cors')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  hbsutils.registerPartials(__dirname + "/../views");
  hbsutils.registerWatchedPartials(__dirname + "/../views");
  app.use(cors())
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3300);
}
bootstrap();
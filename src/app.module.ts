import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirePlaceModule } from './fireplaces/fireplace.module';

@Module({
  imports: [FirePlaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

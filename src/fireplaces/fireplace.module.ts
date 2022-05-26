import { Module } from "@nestjs/common";
import { FirePlaceController } from "./fireplace.controller";
import { FirePlaceSendGateway } from "./fireplace.send.gateway";
import { FirePlaceService } from "./fireplace.service";
import { FirePlacesGateway } from "./fireplaces.gateway";

@Module({
    imports: [FirePlaceSendGateway],
    controllers: [FirePlaceController],
    providers: [FirePlaceSendGateway, FirePlaceService, FirePlacesGateway],
    exports: [FirePlaceService]
  })
  export class FirePlaceModule {}
  
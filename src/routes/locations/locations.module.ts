import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { CommonService } from 'src/services/common/common.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService, CommonService],
})
export class LocationsModule {}

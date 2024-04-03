import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { CommonService } from 'src/services/common/common.service';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, CommonService],
})
export class BrandsModule {}

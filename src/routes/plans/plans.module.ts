import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { CommonService } from 'src/services/common/common.service';

@Module({
  controllers: [PlansController],
  providers: [PlansService, CommonService],
})
export class PlansModule {}

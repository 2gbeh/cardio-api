import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { CommonService } from 'src/services/common/common.service';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, CommonService],
})
export class SubscriptionsModule {}

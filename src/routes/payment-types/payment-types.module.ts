import { Module } from '@nestjs/common';
import { PaymentTypesService } from './payment-types.service';
import { PaymentTypesController } from './payment-types.controller';
import { CommonService } from 'src/services/common/common.service';

@Module({
  controllers: [PaymentTypesController],
  providers: [PaymentTypesService, CommonService],
})
export class PaymentTypesModule {}

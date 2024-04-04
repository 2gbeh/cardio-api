import { Module } from '@nestjs/common';
import { PaymentTypesService } from './payment-types.service';
import { PaymentTypesController } from './payment-types.controller';

@Module({
  controllers: [PaymentTypesController],
  providers: [PaymentTypesService],
})
export class PaymentTypesModule {}

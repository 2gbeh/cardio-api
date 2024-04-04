import {
  Controller,
  Get,
  NotFoundException,
  Query,
  UnprocessableEntityException,
  Param,
  MethodNotAllowedException,
} from '@nestjs/common';
import { PaymentTypesService } from './payment-types.service';
import { ReadPaymentTypeDto } from './dto/read-payment-type.dto';
//
import { ControllerHelper } from 'src/helpers/controller.helper';

@Controller('payment-types')
export class PaymentTypesController {
  constructor(private readonly paymentTypesService: PaymentTypesService) {}

  // http://127.0.0.1:8000/api/v1/payment-types?plan_id=dfdec041cc2f6cdcd923feeb
  // Standard
  @Get()
  index(@Query() readPaymentTypeDto: ReadPaymentTypeDto) {
    if (ControllerHelper.hasQuery<ReadPaymentTypeDto>(readPaymentTypeDto)) {
      try {
        return this.paymentTypesService.read(readPaymentTypeDto);
      } catch (err) {
        throw new NotFoundException(err?.message);
      }
    }
    throw new MethodNotAllowedException();
  }

  // http://127.0.0.1:8000/api/v1/payment-types/bdf61af88d5cd5399b4dfe8b
  // Quarterly, 105000
  @Get(':id')
  show(@Param('id') id: string) {
    try {
      return this.paymentTypesService.read(id);
    } catch (err) {
      throw new NotFoundException(err?.message);
    }
  }
}

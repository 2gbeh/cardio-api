import {
  Controller,
  Post,
  Param,
  Get,
  Body,
  UnprocessableEntityException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  /* http://127.0.0.1:8000/api/v1/subscriptions
  { "year": 2010,
    "model_id": "2e2bdaa830f79f3fec7fc22a",
    "plan_id": "dfdec041cc2f6cdcd923feeb",
    "payment_type_id": "bdf61af88d5cd5399b4dfe8b", 
    "location_id": "a9accfbcfac92c4b30bcc2c0", 

    "name": "Emmanuel Tugbeh", 
    "email": "etugbeh@outlook.com", 
    "phone": "+2348169960927" }
  */
  // Toyota - Camry; Standard; Quarterly; Surulere;
  @Post()
  store(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    try {
      return this.subscriptionsService.create(createSubscriptionDto);
    } catch (err) {
      throw new UnprocessableEntityException(err?.message);
    }
  }

  // http://127.0.0.1:8000/api/v1/subscriptions
  @Get()
  index() {
    return this.subscriptionsService.read();
  }

  // http://127.0.0.1:8000/api/v1/subscriptions/1
  // John Doe
  @Get(':id')
  show(@Param('id') id: string) {
    try {
      return this.subscriptionsService.read(id);
    } catch (err) {
      throw new NotFoundException(err?.message);
    }
  }
}

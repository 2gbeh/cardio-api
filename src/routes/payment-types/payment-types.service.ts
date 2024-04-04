import { Injectable } from '@nestjs/common';
import { IPaymentType } from './payment-types.interface';
import { ReadPaymentTypeDto } from './dto/read-payment-type.dto';
//
import { CommonService } from 'src/services/common/common.service';
import fakePaymentTypes from 'src/data/fake-payment-types';

@Injectable()
export class PaymentTypesService {
  constructor(private readonly commonService: CommonService) {
    commonService.setData<IPaymentType[]>(fakePaymentTypes);
  }

  read(queryParams?: string | ReadPaymentTypeDto): IPaymentType | IPaymentType[] {
    // payment-types?plan_id=[:id]
    return typeof queryParams === 'object'
      ? this.commonService.query<ReadPaymentTypeDto, IPaymentType[]>(queryParams)
      : this.commonService.read<string, IPaymentType | IPaymentType[]>(queryParams);
  }
}

import { Injectable } from '@nestjs/common';
import {
  IPaymentType,
  EPaymentTypesServiceError as E,
} from './payment-types.interface';
import { ReadPaymentTypeDto } from './dto/read-payment-type.dto';
//
import { CommonService } from 'src/services/common/common.service';
import fakePlans from 'src/data/fake-plans';
import fakePaymentTypes from 'src/data/fake-payment-types';

@Injectable()
export class PaymentTypesService {
  constructor(private readonly commonService: CommonService) {
    commonService.setData<IPaymentType[]>(fakePaymentTypes);
  }

  read(
    queryParams: string | ReadPaymentTypeDto,
  ): IPaymentType | IPaymentType[] {
    // payment-types?plan_id=[:id]
    if (typeof queryParams === 'object') {
      if (fakePlans.find((e) => e.id == queryParams.plan_id)) {
        return this.commonService.selectWhere<
          ReadPaymentTypeDto,
          IPaymentType[]
        >(queryParams);
      }
      throw new Error(E.PLAN_ID_NOT_FOUND);
    }

    // payment-types/:id
    let paymentType = this.commonService.select<string, IPaymentType>(
      queryParams,
    );
    let plan = fakePlans.find((e) => e.id == paymentType.plan_id);
    return { ...paymentType, plan } as IPaymentType;
  }
}

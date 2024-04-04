import { Injectable } from '@nestjs/common';
import {
  ISubscription,
  ESubscriptionsServiceError as E,
} from './subscriptions.interface';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
//
import { CommonService } from 'src/services/common/common.service';
import fakeSubscriptions from 'src/data/fake-subscriptions';
import fakeBrands from 'src/data/fake-brands';
import fakeModels from 'src/data/fake-models';
import fakePlans from 'src/data/fake-plans';
import fakePaymentTypes from 'src/data/fake-payment-types';
import fakeLocations from 'src/data/fake-locations';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly commonService: CommonService) {
    commonService.setData<ISubscription[]>(fakeSubscriptions);
  }

  create(body: CreateSubscriptionDto): ISubscription {
    if (fakeModels.find((e) => e.id == body.model_id)) {
      if (fakePlans.find((e) => e.id == body.plan_id)) {
        if (fakePaymentTypes.find((e) => e.id == body.payment_type_id)) {
          if (fakeLocations.find((e) => e.id == body.location_id)) {
            return this.commonService.insert<
              CreateSubscriptionDto,
              ISubscription
            >(body);
          }
          throw new Error(E.LOCATION_ID_NOT_FOUND);
        }
        throw new Error(E.PAYMENT_TYPE_ID_NOT_FOUND);
      }
      throw new Error(E.PLAN_ID_NOT_FOUND);
    }
    throw new Error(E.MODEL_ID_NOT_FOUND);
  }

  read(id?: string): ISubscription | ISubscription[] {
    // subscriptions/:id
    if (id) {
      let subscription = this.commonService.select<string, ISubscription>(id);
      let model = fakeModels.find((e) => e.id == subscription.model_id);
      let brand = fakeBrands.find((e) => e.id == model?.brand_id);
      let plan = fakePlans.find((e) => e.id == subscription.plan_id);
      let paymentType = fakePaymentTypes.find(
        (e) => e.id == subscription.payment_type_id,
      );
      let location = fakeLocations.find(
        (e) => e.id == subscription.location_id,
      );
      //
      return { ...subscription, model, brand, plan, paymentType, location } as ISubscription;
    }

    // subscriptions
    return this.commonService.select<undefined, ISubscription[]>();
  }
}

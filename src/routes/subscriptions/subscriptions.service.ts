import { Injectable } from '@nestjs/common';
import { ISubscription } from './subscriptions.interface';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
//
import { CommonService } from 'src/services/common/common.service';
import fakeSubscriptions from 'src/data/fake-subscriptions';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly commonService: CommonService) {
    commonService.setData<ISubscription[]>(fakeSubscriptions);
  }

  create(body: CreateSubscriptionDto): ISubscription {
    return this.commonService.create<CreateSubscriptionDto, ISubscription>(
      body,
    );
  }

  read(): ISubscription[] {
    return this.commonService.read<undefined, ISubscription[]>();
  }
}

import { Injectable } from '@nestjs/common';
import { TCollection } from 'src/types/common.type';
import { ReadPlanDto } from './dto/read-plan.dto';
//
import fakeBrands from 'src/data/fake-brands';
import fakeModels from 'src/data/fake-models';
import fakePlans from 'src/data/fake-plans';

@Injectable()
export class PlansService {
  // keep year
  // check model_id
  // get brand
  // get plans
  read(queryParams: ReadPlanDto): TCollection {
    let model = fakeModels.find((e) => e.id == queryParams.model_id);
    if (model) {
      let brand = fakeBrands.find((e) => e.id == model?.brand_id);
      if (brand) {
        return { brand, model, plans: fakePlans };
      }
    }
    throw new Error();
  }
}

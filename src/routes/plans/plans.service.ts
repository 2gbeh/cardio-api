import { Injectable } from '@nestjs/common';
import { TDocument } from 'src/types/common.type';
import { IPlan } from './plans.interface';
import { ReadPlanDto } from './dto/read-plan.dto';
//
import { CommonService } from 'src/services/common/common.service';
import fakeBrands from 'src/data/fake-brands';
import fakeModels from 'src/data/fake-models';
import fakePlans from 'src/data/fake-plans';

@Injectable()
export class PlansService {
  constructor(private readonly commonService: CommonService) {
    commonService.setData<IPlan[]>(fakePlans);
  }

  read(queryParams: string | ReadPlanDto): TDocument | IPlan {
    // plans?model_id=[:id]&year=2010
    if (typeof queryParams === 'object') {
      // keep year
      // check model_id
      // get brand
      // get plans
      let model = fakeModels.find((e) => e.id == queryParams.model_id);
      if (model) {
        let brand = fakeBrands.find((e) => e.id == model?.brand_id);
        if (brand) {
          return {
            brand,
            model,
            plans: fakePlans,
            year: queryParams.year,
          } as TDocument;
        }
        throw new Error('Brand not found');
      }
      throw new Error('Model not found');
    } else {
      return this.commonService.read<string, IPlan>(queryParams);
    }
  }
}

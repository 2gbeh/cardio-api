import { Injectable } from '@nestjs/common';
import { TDocument } from 'src/types/common.type';
import { IPlan, EPlansServiceError as E } from './plans.interface';
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
            year: queryParams.year,
            brand,
            model,
            plans: fakePlans,
          } as TDocument;
        }
        throw new Error(E.BRAND_ID_NOT_FOUND);
      }
      throw new Error(E.MODEL_ID_NOT_FOUND);
    } else {
      return this.commonService.select<string, IPlan>(queryParams);
    }
  }
}

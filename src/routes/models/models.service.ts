import { Injectable } from '@nestjs/common';
import { IModel, EModelsServiceError as E } from './models.interface';
import { CreateModelDto } from './dto/create-model.dto';
import { ReadModelDto } from './dto/read-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
//
import { CommonService } from 'src/services/common/common.service';
import fakeBrands from 'src/data/fake-brands';
import fakeModels from 'src/data/fake-models';

@Injectable()
export class ModelsService {
  static UNIQUE_KEYS = ['brand_id', 'model'];

  constructor(private readonly commonService: CommonService) {
    commonService.setData<IModel[]>(fakeModels);
  }

  create(body: CreateModelDto): IModel {
    if (fakeBrands.find((e) => e.id == body.brand_id)) {
      return this.commonService.insert<CreateModelDto, IModel>(
        body,
        ModelsService.UNIQUE_KEYS,
      );
    }
    throw new Error(E.BRAND_ID_NOT_FOUND);
  }

  read(queryParams?: string | ReadModelDto): IModel | IModel[] {
    // models?brand_id=[:id]
    if (queryParams) {
      if (typeof queryParams === 'object') {
        return this.commonService.selectWhere<ReadModelDto, IModel[]>(
          queryParams,
        );
      }

      // models/:id
      let model = this.commonService.select<string, IModel>(queryParams);
      let brand = fakeBrands.find((e) => e.id == model.brand_id);
      return { ...model, brand } as IModel;
    }

    // models
    return this.commonService.select<undefined, IModel[]>();
  }

  update(id: string, body: UpdateModelDto): IModel {
    if (fakeBrands.find((e) => e.id == body.brand_id)) {
      return this.commonService.update<string, UpdateModelDto, IModel>(
        id,
        body,
        ModelsService.UNIQUE_KEYS,
      );
    }
    throw new Error(E.BRAND_ID_NOT_FOUND);
  }

  delete(id: string): IModel {
    return this.commonService.delete<string, IModel>(id);
  }
}

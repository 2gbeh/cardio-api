import { Injectable } from '@nestjs/common';
import { IModel } from './models.interface';
import { CreateModelDto } from './dto/create-model.dto';
import { ReadModelDto } from './dto/read-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
//
import { CommonService } from 'src/services/common/common.service';
import fakeModels from 'src/data/fake-models';

@Injectable()
export class ModelsService {
  constructor(private readonly commonService: CommonService) {
    commonService.setData<IModel[]>(fakeModels);
  }

  create(body: CreateModelDto): IModel {
    return this.commonService.create<CreateModelDto, IModel>(body);
  }

  read(queryParams?: string | ReadModelDto): IModel | IModel[] {
    // models?brand_id=[:brand_id]
    if (typeof queryParams === 'object') {
      return fakeModels.filter((e) => e.brand_id == queryParams.brand_id);
    }
    return this.commonService.read<string | ReadModelDto, IModel | IModel[]>(
      queryParams,
    );
  }

  update(id: string, body: UpdateModelDto): IModel {
    return this.commonService.update<string, UpdateModelDto, IModel>(id, body);
  }

  delete(id: string): IModel {
    return this.commonService.delete<string, IModel>(id);
  }
}

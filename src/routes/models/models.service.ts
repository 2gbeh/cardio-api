import { Injectable } from '@nestjs/common';
import { IModel, type TReadArgs, type TReadReturn } from './models.interface';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
//
import { CommonService } from '../../services/common/common.service';
import fakeModels from '../../data/fake-models';

@Injectable()
export class ModelsService {
  constructor(private readonly commonService: CommonService) {
    commonService.setData<IModel[]>(fakeModels);
  }

  create(createModelDto: CreateModelDto): IModel {
    return this.commonService.create<CreateModelDto, IModel>(createModelDto);
  }

  read(args?: TReadArgs): TReadReturn {
    return this.commonService.read<TReadArgs, TReadReturn>(args);
  }

  update(id: string, updateModelDto: UpdateModelDto): IModel {
    return this.commonService.update<string, UpdateModelDto, IModel>(
      id,
      updateModelDto,
    );
  }

  delete(id: string): IModel {
    return this.commonService.delete<string, IModel>(id);
  }
}

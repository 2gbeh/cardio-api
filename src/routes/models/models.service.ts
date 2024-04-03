import { Injectable } from '@nestjs/common';
import { IModel } from './models.interface';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
// 
import { getUuid, getDatetime } from 'src/utils';
import fakeModels from '../../data/fake-models';

@Injectable()
export class ModelsService {
  private data: IModel[] = fakeModels;

  create(createModelDto: CreateModelDto): IModel {
    let [id, created_at] = [getUuid(), getDatetime()];
    let obj = {
      ...CreateModelDto,
      created_at,
      id,
    };
    this.data.push(obj);
    return obj;
  }

  read(args?: string | { brand_id: string }): IModel | IModel[] {
    if (args) {
      if (typeof args === 'object') {
        // models?brand_id=[:brand_id]
        return this.data.filter((e) => e.brand_id == args?.brand_id);
      } else {
        // models/:model_id
        let obj = this.data.find((e) => e.id == args);
        if (!obj) throw new Error('Not found');
        return obj;
      }
    } else {
      // models
      return this.data ?? [];
    }
  }

  update(id: string, updateModelDto: UpdateModelDto): IModel {
    this.data = this.data.map((e) => {
      if (e.id == id) {
        return { ...e, ...updateModelDto };
      }
      return e;
    });
    // 
    return this.read(id) as IModel;
  }

  delete(id: string): IModel {
    let deledted = this.read(id);
    this.data = this.data.filter((e) => e.id != id);
    // 
    return deledted as IModel;
  }
}

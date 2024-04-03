import { Injectable } from '@nestjs/common';
import { IBrand } from './brands.interface';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
// 
import { getUuid, getDatetime } from 'src/utils';
import fakeBrands from '../../data/fake-brands';

@Injectable()
export class BrandsService {
  private data: IBrand[] = fakeBrands;

  create(createBrandDto: CreateBrandDto) {
    return 'This action adds a new brand';
  }

  read(args?: string) {
    if (args) {
      // brands/:brand_id
      let obj = this.data.find((e) => e.id == args);
      if (!obj) {
        throw new Error('Not found');
      }
      return obj;
    } else {
      // brands
      return this.data ?? [];
    }
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  delete(id: string) {
    return `This action removes a #${id} brand`;
  }
}

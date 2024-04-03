import { Injectable } from '@nestjs/common';
import { IBrand, type TReadArgs, type TReadReturn } from './brands.interface';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
//
import { CommonService } from '../../services/common/common.service';
import fakeBrands from '../../data/fake-brands';

@Injectable()
export class BrandsService {
  constructor(private readonly commonService: CommonService) {
    commonService.setData<IBrand[]>(fakeBrands);
  }

  create(createBrandDto: CreateBrandDto): IBrand {
    return this.commonService.create<CreateBrandDto, IBrand>(createBrandDto);
  }

  read(args?: TReadArgs): TReadReturn {
    return this.commonService.read<TReadArgs, TReadReturn>(args);
  }

  update(id: string, updateBrandDto: UpdateBrandDto): IBrand {
    return this.commonService.update<string, UpdateBrandDto, IBrand>(
      id,
      updateBrandDto,
    );
  }

  delete(id: string): IBrand {
    return this.commonService.delete<string, IBrand>(id);
  }
}

import { Injectable } from '@nestjs/common';
import { IBrand } from './brands.interface';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
//
import { CommonService } from 'src/services/common/common.service';
import fakeBrands from 'src/data/fake-brands';

@Injectable()
export class BrandsService {
  constructor(private readonly commonService: CommonService) {
    commonService.setData<IBrand[]>(fakeBrands);
  }

  create(body: CreateBrandDto): IBrand {
    return this.commonService.create<CreateBrandDto, IBrand>(body);
  }

  read(queryParams?: string): IBrand | IBrand[] {
    return this.commonService.read<string, IBrand | IBrand[]>(queryParams);
  }

  update(id: string, body: UpdateBrandDto): IBrand {
    return this.commonService.update<string, UpdateBrandDto, IBrand>(
      id,
      body,
    );
  }

  delete(id: string): IBrand {
    return this.commonService.delete<string, IBrand>(id);
  }
}

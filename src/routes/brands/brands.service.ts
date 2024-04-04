import { Injectable } from "@nestjs/common";
import { IBrand } from "./brands.interface";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
//
import { CommonService } from "src/services/common/common.service";
import fakeBrands from "src/data/fake-brands";

@Injectable()
export class BrandsService {
  static UNIQUE_KEYS = ["brand"]

  constructor(private readonly commonService: CommonService) {
    commonService.setData<IBrand[]>(fakeBrands);
  }

  create(body: CreateBrandDto): IBrand {
    return this.commonService.insert<CreateBrandDto, IBrand>(body, BrandsService.UNIQUE_KEYS);
  }

  read(queryParams?: string | CreateBrandDto): IBrand | IBrand[] {
    // brands?brand=[:brand]
    return typeof queryParams === "object"
      ? this.commonService.selectWhere<CreateBrandDto, IBrand[]>(queryParams)
      : this.commonService.select<string, IBrand | IBrand[]>(queryParams);
  }

  update(id: string, body: UpdateBrandDto): IBrand {
    return this.commonService.update<string, UpdateBrandDto, IBrand>(id, body, BrandsService.UNIQUE_KEYS);
  }

  delete(id: string): IBrand {
    return this.commonService.delete<string, IBrand>(id);
  }
}

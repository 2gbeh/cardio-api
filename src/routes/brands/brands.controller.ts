import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  // http://127.0.0.1:8000/api/v1/brands
  // { "brand": "Maybach" }
  @Post()
  store(@Body() createBrandDto: CreateBrandDto) {
    try {
      return this.brandsService.create(createBrandDto);
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  // http://127.0.0.1:8000/api/v1/brands
  @Get()
  index() {
    return this.brandsService.read();
  }

  // http://127.0.0.1:8000/api/v1/brands/23bd5bd1e25d35abacf1a8b2
  // Toyota
  @Get(':id')
  show(@Param('id') id: string) {
    try {
      return this.brandsService.read(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // http://127.0.0.1:8000/api/v1/brands/72bc61bba900d4c748efbcff
  // { "brand": "Hyundia" }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    try {
      return this.brandsService.update(id, updateBrandDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // http://127.0.0.1:8000/api/v1/brands/8fab533c9e868e10babd6edb
  // Volkswagen
  @Delete(':id')
  destory(@Param('id') id: string) {
    try {
      return this.brandsService.delete(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

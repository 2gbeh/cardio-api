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

  @Post()
  store(@Body() createBrandDto: CreateBrandDto) {
    try {
      return this.brandsService.create(createBrandDto);
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  @Get()
  index() {
    return this.brandsService.read();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    try {
      return this.brandsService.read(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    try {
      return this.brandsService.update(id, updateBrandDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  destory(@Param('id') id: string) {
    try {
      return this.brandsService.delete(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

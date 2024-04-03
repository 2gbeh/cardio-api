import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  store(@Body() createModelDto: CreateModelDto) {
    try {
      return this.modelsService.create(createModelDto);
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  @Get()
  index(@Query('brand_id') brand_id?: string) {
    if (brand_id) {
      return this.modelsService.read({ brand_id });
    }
    return this.modelsService.read();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    try {
      return this.modelsService.read(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    try {
      return this.modelsService.update(id, updateModelDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  destory(@Param('id') id: string) {
    try {
      return this.modelsService.delete(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

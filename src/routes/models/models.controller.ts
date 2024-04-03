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
import { ReadModelDto } from './dto/read-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}
  
  // http://127.0.0.1:8000/api/v1/models
  // { "brand_id": "9004dd93ae8fda17c9a6dbfd", "model": "Civic Models" }
  @Post()
  store(@Body() createModelDto: CreateModelDto) {
    try {
      return this.modelsService.create(createModelDto);
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }
  
  // http://127.0.0.1:8000/api/v1/models
  // http://127.0.0.1:8000/api/v1/models?brand_id=c4f86eddee8a0d4a54de4c82
  // Mercedes
  @Get()
  index(@Query() readModelDto?: ReadModelDto) {
    if (readModelDto) {
      return this.modelsService.read(readModelDto);
    }
    return this.modelsService.read();
  }
  
  // http://127.0.0.1:8000/api/v1/models/2e2bdaa830f79f3fec7fc22a
  // Camry
  @Get(':id')
  show(@Param('id') id: string) {
    try {
      return this.modelsService.read(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
  
  // http://127.0.0.1:8000/api/v1/models/94b325cd20bdc9c2def6f7d5
  // { "model": "Crosstour" }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    try {
      return this.modelsService.update(id, updateModelDto);
    } catch (err) {
      throw new NotFoundException();
    }
  } 
  
  // http://127.0.0.1:8000/api/v1/models/cc0aec0a1bbcd3c1e43a7a1c
  // Golf Models
  @Delete(':id')
  destory(@Param('id') id: string) {
    try {
      return this.modelsService.delete(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

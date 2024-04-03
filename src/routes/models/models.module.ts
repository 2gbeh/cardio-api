import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { CommonService } from 'src/services/common/common.service';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService, CommonService],
})
export class ModelsModule {}

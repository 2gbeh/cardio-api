import { PickType } from '@nestjs/mapped-types';
import { CreateModelDto } from './create-model.dto';

export class ReadModelDto extends PickType(CreateModelDto, ['brand_id'] as const) {}

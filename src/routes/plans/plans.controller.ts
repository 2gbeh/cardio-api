import { Controller, Get, Post, Body, Patch, Param, Query, Delete, UnprocessableEntityException } from '@nestjs/common';
import { PlansService } from './plans.service';
import { ReadPlanDto } from './dto/read-plan.dto';
// 
import { ControllerHelper } from 'src/helpers/controller.helper';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  // http://127.0.0.1:8000/api/v1/plans?model_id=2e2bdaa830f79f3fec7fc22a&year=2010
  // Camry
  @Get()
  index(@Query() readPlanDto: ReadPlanDto) {
    if (ControllerHelper.hasQuery<ReadPlanDto>(readPlanDto)) {
      return this.plansService.read(readPlanDto);
    }
    throw new UnprocessableEntityException();
  }
}

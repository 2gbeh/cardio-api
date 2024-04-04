import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // http://127.0.0.1:8000/api/v1/locations
  @Get()
  index() {
    return this.locationsService.read();
  }

  // http://127.0.0.1:8000/api/v1/locations/a9accfbcfac92c4b30bcc2c0
  // Surulere
  @Get(':id')
  show(@Param('id') id: string) {
    try {
      return this.locationsService.read(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

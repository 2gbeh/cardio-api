import { Injectable } from '@nestjs/common';
import { ILocation } from './locations.interface';
//
import { CommonService } from 'src/services/common/common.service';
import fakeLocations from 'src/data/fake-locations';

@Injectable()
export class LocationsService {
  constructor(private readonly commonService: CommonService) {
    commonService.setData<ILocation[]>(fakeLocations);
  }

  read(id?: string): ILocation | ILocation[] {
    return this.commonService.read<string, ILocation | ILocation[]>(id);
  }
}

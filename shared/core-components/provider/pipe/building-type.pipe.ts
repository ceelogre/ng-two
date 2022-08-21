import {EBuildingType} from './../../../../core/job/providers/enum/building-types.enum';
import {Pipe, PipeTransform} from '@angular/core';
import {ValuationDataService} from './../../../../core/job/providers/service/valuation-data.service';

@Pipe({
  name: 'buildingFilter'
})

export class BuildingPipe implements PipeTransform {
  constructor(private dataService: ValuationDataService) { }
  transform(_v: EBuildingType): any {
    return this.dataService.buildingTypes.find(({ value }) => value === _v)?.name;
  }
}



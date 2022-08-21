import {Pipe, PipeTransform} from '@angular/core';
import {ELandType} from './../../../../core/job/providers/enum/building-types.enum';
import {ValuationDataService} from './../../../../core/job/providers/service/valuation-data.service';

@Pipe({
  name: 'landFilter'
})

export class LandPipe implements PipeTransform {
  constructor(private dataService: ValuationDataService) { }
  transform(_v: ELandType): any {
    return this.dataService.landTypes.find(({ value }) => value === _v)?.name;
  }
}



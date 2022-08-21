import {Pipe, PipeTransform} from '@angular/core';
import {EResidenceCategory} from './../../../../core/job/providers/enum/building-types.enum';
import {ValuationDataService} from './../../../../core/job/providers/service/valuation-data.service';

@Pipe({
  name: 'residenceFilter'
})

export class ResidenceFilterPipe implements PipeTransform {
  constructor(private dataService: ValuationDataService) { }
  transform(_v: EResidenceCategory): any {
    return this.dataService.residenceCategory.find(({ value }) => value === _v)?.name;
  }
}

import {Pipe, PipeTransform} from '@angular/core';
import {EValuationType} from './../../../../core/job/providers/enum/valuation-type.enum';
import {ValuationDataService} from './../../../../core/job/providers/service/valuation-data.service';

@Pipe({
  name: 'valuationFilter'
})

export class ValuationPipe implements PipeTransform {
  constructor(private dataService: ValuationDataService) { }
  transform(_v: EValuationType): any {
    return this.dataService.valuationTypes.find(({ value }) => value === _v)?.name;
  }
}



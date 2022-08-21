import { Pipe, PipeTransform } from '@angular/core';
import { EValuationMethod } from './../../../../core/job/providers/enum/valuation-method.enum';
import { ValuationDataService } from './../../../../core/job/providers/service/valuation-data.service';

@Pipe({
  name: 'methodFilter'
})

export class ValuationMethodPipe implements PipeTransform {
  constructor(private dataService: ValuationDataService) { }
  transform(_v: EValuationMethod): any {
    return this.dataService.valuationMethods.find(({ value }) => value === _v)?.name;
  }
}



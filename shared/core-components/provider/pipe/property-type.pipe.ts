import {Pipe, PipeTransform} from '@angular/core';
import {EPropertyType} from 'src/app/core/job/providers/enum/property-type.enum';
import {ValuationDataService} from './../../../../core/job/providers/service/valuation-data.service';

@Pipe({
  name: 'propertyFilter'
})

export class PropertyPipe implements PipeTransform {
  constructor(private dataService: ValuationDataService) { }
  transform(_v: EPropertyType): any {
    return this.dataService.propertyTypes.find(({ value }) => value === _v)?.name;
  }
}



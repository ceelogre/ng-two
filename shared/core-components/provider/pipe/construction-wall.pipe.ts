import { EBuildingUtility } from './../../../../core/job/providers/enum/building-utility.enum';
import { EBuildingService } from './../../../../core/job/providers/enum/building-service.enum';
import { Pipe, PipeTransform } from '@angular/core';
import { EConstructionProp } from './../../../../core/job/providers/enum/construction-property.enum';
import { ValuationDataService } from './../../../../core/job/providers/service/valuation-data.service';

@Pipe({
  name: 'constructionFilter'
})

export class ConstructionPipe implements PipeTransform {
  constructor(private dataService: ValuationDataService) { }
  transform(_v: EConstructionProp | EBuildingService | EBuildingUtility, type: 'wall' | 'service' | 'utility' | 'access'): any {
    switch (type) {
      case 'service':
        return this.filter('buildingServices', _v);
      case 'utility':
        return this.filter('buildingUtilities', _v);
      case 'access':
        return this.filter('propertyAccess', _v);
      default:
        return this.filter('constructionProperties', _v);

    }
  }

  filter(scope: string, val: EConstructionProp | EBuildingService | EBuildingUtility): string {
    return this.dataService[scope].find(({ value }) => value === val)?.name;
  }
}



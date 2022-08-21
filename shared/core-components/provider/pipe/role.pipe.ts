import {Pipe, PipeTransform} from '@angular/core';
import {DataService} from 'src/app/provider/service/data.service';
import {EUserRole} from './../../../../provider/enum/user-role.enum';

@Pipe({
  name: 'roleFilter'
})

export class RolePipe implements PipeTransform {
  constructor(private dataService: DataService) { }
  transform(_v: EUserRole): any {
    return this.dataService.userRole.find(({ value }) => value === _v)?.name;
  }
}



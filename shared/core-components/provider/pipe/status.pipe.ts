import {Pipe, PipeTransform} from '@angular/core';
import {EUserStatus} from '../../../../provider/enum/user-status.emun';
import {IGenValue} from '../../../../provider/model/status.model';
import {EInspectionStatus} from './../../../../provider/enum/inspection-status.enum';

@Pipe({
  name: 'statusFilter'
})

export class StatusPipe implements PipeTransform {
  transform(_v: EUserStatus | EInspectionStatus, statuses: IGenValue<EUserStatus | EInspectionStatus>[]): any {
    return statuses.find(({ value }) => value === _v)?.name;
  }
}



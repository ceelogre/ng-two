import {EInspectionStatus} from './../../../../provider/enum/inspection-status.enum';
import {Directive, HostBinding, Input} from '@angular/core';
import {EUserStatus} from './../../../../provider/enum/user-status.emun';

@Directive({ selector: '[status]' })
export class StatusDirective {
  private status: EUserStatus | EInspectionStatus;
  constructor() { }

  // add primary class on STARTED  inspection status
  @HostBinding('class.primary')
  get primary(): boolean {
    return this.status === EInspectionStatus.NEW;
  }

  // add primary class on PENDING  inspection status
  @HostBinding('class.warning')
  get warning(): boolean {
    return this.status === EInspectionStatus.PENDING || this.status === EInspectionStatus.STARTED;
  }

  // add danger class on TODO | INACTIVE statuses [inspection | user]
  @HostBinding('class.danger')
  get danger(): boolean {
    return this.status === EUserStatus.INACTIVE ||
      this.status === EInspectionStatus.FAILED;
  }

  // add success class on COMPLETED  inspection status
  @HostBinding('class.success')
  get success(): boolean {
    return this.status === EInspectionStatus.COMPLETED ||
      this.status === EInspectionStatus.SUCCESSFUL ||
      this.status === EInspectionStatus.CLOSED ||
      this.status === EInspectionStatus.APPROVED ||
      this.status === EUserStatus.ACTIVE;
  }

  //  setter for ctrl state
  @Input('status')
  set statuses(value: EUserStatus | EInspectionStatus) {
    if (value !== this.status) {
      this.status = value;
    }
  }

}

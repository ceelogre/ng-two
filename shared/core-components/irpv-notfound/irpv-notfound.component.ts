import { DataService } from './../../../provider/service/data.service';
import { EUserRole } from './../../../provider/enum/user-role.enum';
import { StateService } from './../../../provider/service/state.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EfilterType } from './../../../provider/enum/filter-type.enum';

@Component({
  selector: 'irpv-notfound',
  templateUrl: './irpv-notfound.component.html',
  styleUrls: ['./irpv-notfound.component.css']
})
export class IrpvNotfoundComponent implements OnInit, OnChanges {
  @Input() type: EfilterType;
  @Input() isFilter = false;
  config = {
    msg: null,
    btn: null
  }

  @Output() onClickEvent = new EventEmitter<boolean>();

  constructor(private stateService: StateService, private dataService: DataService) { }

  get translations() {
    return this.dataService.translations
  }

  ngOnInit(): void {
    this.setMessage();
  }

  get EfilterType() {
    return EfilterType
  }

  get selectedRole(): EUserRole {
    return this.stateService.authUser.data.role;
  }

  get isAdmin(): boolean {
    return this.stateService.isAdmin;
  }

  // track changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.type) {
      this.type = changes.type.currentValue;
      this.setMessage();
    }
  }

  //  emit on click
  emitOnClick(): void {
    this.onClickEvent.emit(true);
  }

  // preset message
  setMessage(): void {
    switch (this.type) {
      case EfilterType.INSPECTION_STATUS:
      case EfilterType.APPLICATION_STATE:
        if (!this.isAdmin) {
          this.config.msg = this.translations.admin_inspection_notfound;
          this.config.btn = this.translations.create_inspection;
        } else {
          this.config.msg = this.translations.valuer_inspection_notfound;
        }
        break;
      case EfilterType.TOKEN_STATUS:
        this.config.msg = this.translations.token_notfound;
        break;
      case EfilterType.CREDIT_STATUS:
        this.config.msg = this.translations.credit_notfound;
        break;
      case EfilterType.UPI_STATUS:
        this.config.msg = this.translations.upi_notfound;
        break;
      case EfilterType.USER_STATUS:
        this.config.msg = this.translations.user_notfound;
        this.config.btn = this.translations.create_member;
        break;
      case EfilterType.REPORT:
        this.config.msg = this.translations.report_notfound;
        if (this.selectedRole === EUserRole.VALUER) {
          this.config.btn = this.translations.create_new_report;
        }
        break;
      case EfilterType.NO_SITEVISIT:
        this.config.msg = this.translations.sitevisit_notfound;
        this.config.btn = this.translations.back;
        break;
      case EfilterType.REQUEST_STATUS:
        if (this.selectedRole === EUserRole.VALUER) {
          this.config.msg = this.translations.valuer_request_notfound;
        } else {
          this.config.msg = this.translations.bailiff_request_notfound;
          this.config.btn = this.translations.create_request;
        }
        break;
      case EfilterType.WITHDRAW:
        this.config.msg = this.translations.no_withdraw_yet;
        this.config.btn = this.translations.new_withdrawal;
        break;
      default:
        break;
    }
  }

}

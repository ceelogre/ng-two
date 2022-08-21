import { ValidationService } from './../../../../provider/service/validation.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { EStatePartial } from "../../../../provider/enum";
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { ICreatePaymentDto, IStats } from "../../../../provider/model/user.model";
import { DataService } from "../../../../provider/service/data.service";
import { StateService } from "../../../../provider/service/state.service";
import { DashboardService } from "../../../../shared/dashboard-components/provider/service/dashboard.service";
import { ITransaction } from "../../providers/model/transaction.model";
import { TransactionService } from "../../providers/service/credit.service";
import { IMessage } from './../../../../provider/model/message.model';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit, OnDestroy {
  public creditFormGroup: FormGroup;
  userStatistics: IStats;
  @Output() refresh = new EventEmitter<IMessage>();
  subscription: Subscription;
  message: string;
  error: boolean = false;
  isFetching: boolean = false;


  constructor(private formBuilder: FormBuilder, private dataService: DataService,
    private creditService: TransactionService, private stateService: StateService,
    private dashboardService: DashboardService, private validation: ValidationService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      if (message == EStatePartial.STATS_UPDATE.toString()) {
        this.userStatistics = this.userStats;
      }
    });
    this.initCreditFormGroup();
    this.getUserStats();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get userStats(): IStats {
    return this.stateService.state.userStats.data;
  }

  get translations() {
    return this.dataService.translations
  }

  get credsCtrl() {
    return this.creditFormGroup?.controls.creditAmountFromCtrl
  }

  // init authFormGroup
  initCreditFormGroup(): void {
    this.creditFormGroup = this.formBuilder.group({
      creditAmountFromCtrl: new FormControl(100, [Validators.required, this.validation.rangeValidator(100, 2000000)])
    });
  }

  getUserStats(refresh: boolean = true): void {
    if (this.userStats || refresh) {
      const mutation = EStatePartial.STATISTICS;
      this.stateService.setState(mutation); // set loading = true
      this.dashboardService.getUserStatistics().subscribe((response: IResponseObject<IStats>) => {
        if (response.status) {
          const { data } = response;
          this.stateService.setState(mutation, { isLoading: false, data }); // set state
          this.userStatistics = this.userStats;
        }
      });
    } else {
      this.userStatistics = this.userStats;
    }
  }

  pay(): void {
    this.isFetching = true;
    const paymentDto: ICreatePaymentDto = {
      amount: parseInt(this.creditFormGroup.controls.creditAmountFromCtrl.value?.replace(/,/g, "")),
      userId: this.dataService.localStorageFind()
    }

    this.creditService.createPayment(paymentDto).subscribe((response: IResponseObject<ITransaction>) => {
      this.refresh.emit({ error: !response.status, message: response.message });
      this.isFetching = false;
      if (response.status) {
        this.error = false;
        this.dataService.changeMessage(EStatePartial.STATISTICS.toString());
      } else {
        this.error = true;
      }
    })
  }

}

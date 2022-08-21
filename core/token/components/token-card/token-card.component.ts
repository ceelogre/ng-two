import { IMessage } from './../../../../provider/model/message.model';
import { TokenService } from './../../provider/token.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IStats } from "../../../../provider/model/user.model";
import { StateService } from "../../../../provider/service/state.service";
import { EStatePartial } from "../../../../provider/enum";
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { DashboardService } from "../../../../shared/dashboard-components/provider/service/dashboard.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ICreateToken } from "../../../../provider/model/status.model";
import { DataService } from "../../../../provider/service/data.service";
import { IToken } from "../../../credit/providers/model/transaction.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-token-card',
  templateUrl: './token-card.component.html',
  styleUrls: ['./token-card.component.css']
})
export class TokenCardComponent implements OnInit, OnDestroy {
  currentProvinceId: string;
  provinces: any = [];
  userStatistics: IStats;
  tokenFormGroup: FormGroup;
  @Output() refresh = new EventEmitter<IMessage>();
  subscription: Subscription;
  message: string;
  error: boolean = false;
  isFetching: boolean = false;


  constructor(private tokenService: TokenService, private stateService: StateService,
    private dashboardService: DashboardService, private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      if (message == EStatePartial.STATS_UPDATE.toString()) {
        this.userStatistics = this.userStats;
      }
    });
    this.initTokenFormGroup();
    this.getUserStats();
    this.getProvinces();
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

  // init authFormGroup
  initTokenFormGroup(): void {
    this.tokenFormGroup = this.formBuilder.group({
      numberOfTicketFormCtrl: new FormControl(1, [Validators.required])
    });
  }

  getUserStats(refresh: boolean = false): void {
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

  getProvinces(): void {
    this.tokenService.getProvinces().subscribe(res => {
      if (res.status) {
        this.provinces = res.data;
      }
    })
  }

  setCurrentProvince({ id }: { id: string }) {
    this.currentProvinceId = id;
  }

  buy(): void {
    this.isFetching = true;
    const tokenDto: ICreateToken = {
      userId: this.dataService.localStorageFind(),
      numberOfTickets: this.tokenFormGroup.controls.numberOfTicketFormCtrl.value,
      locationId: this.currentProvinceId
    }
    this.tokenService.createTicket(tokenDto).subscribe((response: IResponseObject<IToken>) => {
      this.isFetching = false;
      if (response.status) {
        this.dataService.changeMessage(EStatePartial.STATISTICS.toString());
        this.refresh.emit({ error: false, message: response.message });
      } else {
        this.message = response.message;
        this.error = true;
      }
    })
  }

}

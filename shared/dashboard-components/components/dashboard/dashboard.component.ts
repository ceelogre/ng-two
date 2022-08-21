import { Component, OnDestroy, OnInit } from '@angular/core';
import { IStats, IUser } from "../../../../provider/model/user.model";
import { StateService } from "../../../../provider/service/state.service";
import { DashboardService } from "../../provider/service/dashboard.service";
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { EStatePartial } from "../../../../provider/enum";
import { Subscription } from "rxjs";
import { DataService } from "../../../../provider/service/data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  user: IUser;
  userStatistics: IStats;
  subscription: Subscription;

  constructor(private stateService: StateService, private dashboardService: DashboardService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      if (message == EStatePartial.STATISTICS.toString()) {
        this.getUserStats(true);
      }
    });
    this.getUserStats();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  get userStats(): IStats {
    return this.stateService.state.userStats.data;
  }

  get isAdmin(): boolean {
    return this.stateService.isAdmin;
  }

  get isValuer(): boolean {
    return this.stateService.isValuer;
  }

  get isBailiff(): boolean {
    return this.stateService.isBailiff;
  }

  get profilePicture(): string {
    return this.stateService.profilePicture;
  }

  get translations() {
    return this.dataService.translations
  }

  getUserStats(refetch = false): void {
    this.user = this.stateService.authUser.data;
    if (!this.userStats || refetch) {
      const mutation = EStatePartial.STATISTICS;
      this.stateService.setState(mutation); // set loading = true
      this.dashboardService.getUserStatistics().subscribe((response: IResponseObject<IStats>) => {
        if (response.status) {
          const { data } = response;
          this.stateService.setState(mutation, { isLoading: false, data }); // set state
          this.userStatistics = this.userStats;
          this.dataService.changeMessage(EStatePartial.STATS_UPDATE.toString());
        }
      });
    } else {
      this.userStatistics = this.userStats;
    }
  }

}

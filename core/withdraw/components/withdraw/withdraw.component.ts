import { IUser } from './../../../../provider/model/user.model';
import { UserModalService } from './../../../user/providers/service/user-modal.service';
import { EfilterType } from 'src/app/provider/enum';
import { IResponseObject } from './../../../../provider/model/response-object.model';
import { EStatePartial } from './../../../../provider/enum/state-partial.enum';
import { paginateSearch } from './../../../../provider/util/paginate.util';
import { IDateFilter } from './../../../../provider/model/request-filter.model';
import { IWithdraw } from './../../providers/model/withdraw.model';
import { Router } from '@angular/router';
import { DataService } from './../../../../provider/service/data.service';
import { WithdrawService } from './../../providers/service/withdraw.service';
import { StateService } from './../../../../provider/service/state.service';
import { IMessage } from './../../../../provider/model/message.model';
import { SearchForm } from './../../../../provider/model/search-form.model';
import { IDataSourceConfig } from './../../../../provider/model/table.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  balance: number = null;
  isFetching: boolean = false;
  searchForm: SearchForm;
  message: IMessage;
  withdrawsTable: IDataSourceConfig;
  stringFilter: string = null;

  constructor(
    private stateService: StateService,
    private withdraw: WithdrawService,
    private dataService: DataService,
    private userModalService: UserModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.initializeSearchForm();
    this.getWithdraws(true);
  }

  get withdraws(): IWithdraw[] {
    return this.stateService.withdraws.data;
  }

  get isAdmin(): boolean {
    return this.stateService.isAdmin;
  }

  get withdrawsLoading(): boolean {
    return this.stateService.withdraws.isLoading;
  }

  get tableFiltering() {
    return !!this.searchForm?.endDate || !!this.searchForm?.startDate || !!this.searchForm?.state
  }

  get translations() {
    return this.dataService.translations
  }

  filterByDates(event: IDateFilter): void {
    this.searchForm.startDate = event.startDate;
    this.searchForm.endDate = event.endDate;
    this.getWithdraws(true, this.searchForm);
  }

  initializeSearchForm(): SearchForm {
    let search = paginateSearch();
    search.sort = 'withdrawDate';
    return search;
  }

  // on search change
  onSearchChange(e: string): void {
    if (!e || e.length == 0) {
      this.getWithdraws(true);
    } else if (e.length >= 10) {
      this.searchForm = this.initializeSearchForm();
      this.searchForm.search = e;
      this.getWithdraws(true, this.searchForm);
    }
  }

  // get withdraws
  getWithdraws(refetch: boolean = false, search: SearchForm = this.initializeSearchForm()): void {
    this.isFetching = true;
    this.searchForm = search;
    if (this.withdraws.length === 0 || refetch) {
      const mutation = EStatePartial.WITHDRAWS;
      this.stateService.setState(mutation); // set loading = true
      this.withdraw.getAllWithdraw(search).subscribe((res: IResponseObject<IWithdraw[]>) => {
        this.isFetching = false;
        if (res.status) {
          const { data } = res;
          data.forEach((user) => {
            user.names = user.user?.firstName+ " " + user.user?.lastName;
          });
          this.stateService.setState(mutation, { isLoading: false, data }); // set state
          this.initTable(data, (search.start / search.length) + 1);
        } else {
          this.stateService.withdraws.isLoading = false;
          this.initTable();
        }
      });
    } else {
      this.initTable(this.withdraws);
    }
  }

  refresh(event): void {
    this.getWithdraws(true);
  }


  // on pagination change
  onPagination(num: number): void {
    this.searchForm.start = (num - 1) * this.searchForm.length;
    this.getWithdraws(true, this.searchForm);
  }

  // on refresh
  onRefresh(e: IMessage): void {
    this.message = e;
    this.getWithdraws(true);
  }

  // init inspections table
  initTable(data: any = null, page: number = 1): void {
    this.withdrawsTable = {
      hasAction: true,
      fields: this.withdraw.fields,
      data: data ? data : this.withdraws,
      page: page,
      filterType: EfilterType.WITHDRAW
    }
  }

  // create withdraw
  createWithdraw(): void {
    this.userModalService.openWithdrawModal();
    this.userModalService.dialogRef.componentInstance.actionEvent.subscribe((res: IMessage) => {
      this.message = res;
      if (!res?.error) {
        this.dataService.changeMessage(EStatePartial.STATISTICS.toString());
        this.getWithdraws(true);
      }
    });
  }
}

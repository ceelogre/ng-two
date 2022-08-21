import { IMessage } from './../../../../provider/model/message.model';
import { EfilterType } from 'src/app/provider/enum';
import { TransactionService } from './../../providers/service/credit.service';
import { IDataSourceConfig } from './../../../../provider/model/table.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EStatePartial } from './../../../../provider/enum/state-partial.enum';
import { StateService } from './../../../../provider/service/state.service';
import { ITransaction } from './../../providers/model/transaction.model';
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { DataService } from "../../../../provider/service/data.service";
import { Subscription } from "rxjs";
import { SearchForm } from "../../../../provider/model/search-form.model";
import { paginateSearch } from "../../../../provider/util/paginate.util";
import { IDateFilter } from "../../../../provider/model/request-filter.model";
import { ReportService } from "../../../../provider/service/report.service";

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  message: IMessage;
  inspectionsTable: IDataSourceConfig;
  searchForm: SearchForm;
  isFetching: boolean = false;
  exportLoading = false

  constructor(
    private stateService: StateService,
    private transactionService: TransactionService,
    private reportService: ReportService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      if (message == EStatePartial.TRANSACTIONS.toString()) {
        this.getTransactions(true);
      }
    });
    this.searchForm = this.initializeSearchForm();
    this.getTransactions(true);
  }

  initializeSearchForm(): SearchForm {
    let search = paginateSearch();
    search.userId = this.dataService.localStorageFind();

    return search;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get isAdmin(): boolean {
    return this.stateService.isAdmin;
  }

  get transactions(): ITransaction[] {
    return this.stateService.transactions.data;
  }

  get transactionsLoading(): boolean {
    return this.stateService.transactions.isLoading;
  }

  get tableFiltering() {
    return !!this.searchForm?.endDate || !!this.searchForm?.startDate || !!this.searchForm?.state
  }

  get translations() {
    return this.dataService.translations
  }

  // on pagination change
  onPagination(num: number): void {
    this.searchForm.start = (num - 1) * this.searchForm.length;
    this.getTransactions(true, this.searchForm);
  }

  refresh(event): void {
    this.getTransactions(true);
  }

  filterByDates(event: IDateFilter): void {
    this.searchForm.startDate = event.startDate;
    this.searchForm.endDate = event.endDate;
    this.getTransactions(true, this.searchForm);
  }

  // on search change
  onSearchChange(e: string): void {
    if (!e || e.length == 0) {
      this.getTransactions(true);
    } else if (e.length >= 10) {
      this.searchForm = this.initializeSearchForm();
      this.searchForm.search = e;
      this.getTransactions(true, this.searchForm);
    }
  }

  // get transactions
  getTransactions(refetch = false, search: SearchForm = this.initializeSearchForm()): void {
    this.searchForm = search;
    this.isFetching = true;
    if (this.transactions?.length === 0 || refetch) {
      const mutation = EStatePartial.TRANSACTIONS;
      this.stateService.setState(mutation); // set loading = true
      this.transactionService.getUserTransactions(search).subscribe((res: IResponseObject<ITransaction[]>) => {
        this.isFetching = false;
        if (res.status) {
          const { data } = res;
          data.forEach((value, index) => {
            value.amount = value.amount;
            value.index = index + 1;
            value.status = value.transactionStatus;
            if (this.isAdmin) {
              const { user } = value;
              if (user?.valuerId) {
                value.valuerId = user?.valuerId;
              } else {
                value.valuerId = this.translations.n_a;
              }
              if (user) {
                value.names = user?.firstName.concat(' ').concat(user?.lastName);
                value.category = user?.role;
              } else {
                value.names = 'Citizen';
                value.category = 'PUBLIC';
              }

            }

          });
          this.stateService.setState(mutation, { isLoading: false, data }); // set state
          this.initTable(data, (search.start / search.length) + 1);
        } else {
          this.stateService.transactions.isLoading = false;
        }
      });
    } else {
      this.initTable(this.transactions);
    }
  }

  generateStatement(event: any): void {
    this.exportLoading = true;
    let startDate = null;
    let endDate = null;
    if (this.searchForm.endDate)
      endDate = new Date(this.searchForm.endDate).toDateString();
    else
      endDate = new Date().toDateString();

    if (this.searchForm.startDate)
      startDate = new Date(this.searchForm.startDate).toDateString();
    else
      startDate = new Date('1970-01-01T00:00:00.000Z').toDateString();

    this.reportService.downloadPaymentStatement(this.dataService.localStorageFind(), startDate, endDate).subscribe((response: IResponseObject<any>) => {
      this.exportLoading = false;
      if (response.status) {
        const title = "Account Statement: ".concat(startDate).concat('_to_').concat(endDate);
        const sampleArr = this.reportService.base64ToArrayBuffer(response.data);
        this.reportService.saveByteArray({
          baseName: title,
          extension: 'pdf'
        }, sampleArr);
      }
    })


  }

  // on refresh
  onRefresh(e: IMessage): void {
    this.message = e;
    this.getTransactions(true);
  }


  // init inspections table
  initTable(data: any = null, page: number = 1): void {
    if (this.isAdmin) {
      this.inspectionsTable = {
        hasAction: true,
        fields: this.transactionService.adminFields,
        data: data ? data : this.transactions,
        page: page,
        filterType: EfilterType.CREDIT_STATUS
      }
    } else {
      this.inspectionsTable = {
        hasAction: true,
        fields: this.transactionService.fields,
        data: data ? data : this.transactions,
        page: page,
        filterType: EfilterType.CREDIT_STATUS
      }
    }
  }

}

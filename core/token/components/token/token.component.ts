import { IMessage } from './../../../../provider/model/message.model';
import { EfilterType } from './../../../../provider/enum/filter-type.enum';
import { EStatePartial } from 'src/app/provider/enum/state-partial.enum';
import { IToken } from './../../../credit/providers/model/transaction.model';
import { Router } from '@angular/router';
import { StateService } from './../../../../provider/service/state.service';
import { IDataSourceConfig } from './../../../../provider/model/table.model';
import { Component, OnInit } from '@angular/core';
import { TokenService } from "../../provider/token.service";
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { SearchForm } from "../../../../provider/model/search-form.model";
import { paginateSearch } from "../../../../provider/util/paginate.util";
import { DataService } from "../../../../provider/service/data.service";
import { IDateFilter } from "../../../../provider/model/request-filter.model";

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  balance: number = null;
  isFetching: boolean = false;
  searchForm: SearchForm;
  message: IMessage;
  tokensTable: IDataSourceConfig;

  constructor(
    private stateService: StateService,
    private tokenService: TokenService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.initializeSearchForm();
    this.getTokenTransactions(true);
  }

  get tokens(): IToken[] {
    return this.stateService.tokens.data;
  }

  get isAdmin(): boolean {
    return this.stateService.isAdmin;
  }

  get tokensLoading(): boolean {
    return this.stateService.tokens.isLoading;
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
    this.getTokenTransactions(true, this.searchForm);
  }

  initializeSearchForm(): SearchForm {
    let search = paginateSearch();
    search.userId = this.dataService.localStorageFind();

    return search;
  }

  // on search change
  onSearchChange(e: string): void {
    if (!e || e.length == 0) {
      this.getTokenTransactions(true);
    } else if (e.length >= 10) {
      this.searchForm = this.initializeSearchForm();
      this.searchForm.search = e;
      this.getTokenTransactions(true, this.searchForm);
    }
  }

  // get transactions
  getTokenTransactions(refetch: boolean = false, search: SearchForm = this.initializeSearchForm()): void {
    this.isFetching = true;
    this.searchForm = search;
    if (this.tokens.length === 0 || refetch) {
      const mutation = EStatePartial.TOKENS;
      this.stateService.setState(mutation); // set loading = true
      this.tokenService.getUserTickets(search).subscribe((res: IResponseObject<IToken[]>) => {
        this.isFetching = false;
        if (res.status) {
          const { data } = res;
          data.forEach((value, index) => {
            value.cost = value.cost;
            value.id = index + 1;
            value.locationName = value.location.name;
            if (this.isAdmin) {
              const { user } = value;
              value.valuerId = user.valuerId;
              value.valuerNames = user.firstName.concat(' ').concat(user.lastName);
            }
          });
          this.stateService.setState(mutation, { isLoading: false, data }); // set state
          this.initTable(data, (search.start / search.length) + 1);
        } else {
          this.stateService.tokens.isLoading = false;
        }
      });
    } else {
      this.initTable(this.tokens);
    }
  }

  // go transaction details
  toggleTransaction({ id }): void {
    this.router.navigateByUrl('/transactions/' + id);
  }

  refresh(event): void {
    this.getTokenTransactions(true);
  }


  // on pagination change
  onPagination(num: number): void {
    this.searchForm.start = (num - 1) * this.searchForm.length;
    this.getTokenTransactions(true, this.searchForm);
  }

  // on refresh
  onRefresh(e: IMessage): void {
    this.message = e;
    this.getTokenTransactions(true);
  }

  // init inspections table
  initTable(data: any = null, page: number = 1): void {
    if (this.isAdmin) {
      this.tokensTable = {
        hasAction: true,
        fields: this.tokenService.adminFields,
        data: data ? data : this.tokens,
        page: page,
        filterType: EfilterType.TOKEN_STATUS
      }
    } else {
      this.tokensTable = {
        hasAction: true,
        fields: this.tokenService.fields,
        data: data ? data : this.tokens,
        page: page,
        filterType: EfilterType.TOKEN_STATUS
      }
    }
  }
}



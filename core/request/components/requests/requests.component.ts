import { IMessage } from './../../../../provider/model/message.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDataSourceConfig } from "../../../../provider/model/table.model";
import { IRequest } from "../../../job/providers/model/inspection.model";
import { StateService } from "../../../../provider/service/state.service";
import { Router } from "@angular/router";
import { EEvaluationType, EfilterType, EStatePartial } from "../../../../provider/enum";
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { RequestService } from "../provider/service/request.service";
import { MatDialog } from "@angular/material/dialog";
import { CreateRequestComponent } from "../create-request/create-request.component";
import { Subscription } from "rxjs";
import { DataService } from "../../../../provider/service/data.service";
import { paginateRequest } from "../../../../provider/util/paginate.util";
import { IDateFilter, RequestFilter } from "../../../../provider/model/request-filter.model";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {
  message: IMessage
  requestsTable: IDataSourceConfig;
  dialogRef: any = {};
  subscription: Subscription;
  isFetching: boolean = false;
  searchForm: RequestFilter;

  constructor(private stateService: StateService, private router: Router,
    private requestService: RequestService, private dialog: MatDialog,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.searchForm = this.initializeSearchForm();
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      if (message == EStatePartial.REQUEST.toString()) {
        this.getUserRequests(true);
      }
    });
    this.getUserRequests(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initializeSearchForm(): RequestFilter {
    return paginateRequest();
  }

  get requests(): IRequest[] {
    return this.stateService.requests.data;
  }

  get requestsLoading(): boolean {
    return this.stateService.requests.isLoading;
  }

  get isBailiff() {
    return this.stateService.isBailiff;
  }

  get isAdmin() {
    return this.stateService.isAdmin;
  }

  get tableFiltering() {
    return !!this.searchForm?.endDate || !!this.searchForm?.startDate || !!this.searchForm?.status
  }

  get translations() {
    return this.dataService.translations
  }

  filterResults(event: any): void {
    this.isFetching = true;
    this.searchForm.status = event;
    this.requestService.getUserRequestsByState(this.searchForm).subscribe((response: IResponseObject<IRequest[]>) => {
      this.processResponse(response);
    });
  }

  processResponse(response: IResponseObject<IRequest[]>, page: number = 1): void {
    const mutation = EStatePartial.REQUESTS;
    this.isFetching = false;
    this.stateService.setState(mutation); // set loading = true)
    if (response.status) {
      const { data } = response;
      data.forEach((request, index) => {
        request.upi = request.parcel?.upi;
        request.propertyType = request.parcel?.landUse;
        request.location = request.parcel?.locationName;

        if (this.isAdmin) {
          const { valuer } = request;
          const { bailiff } = request;

          if (!request.nationalId) {
            request.nationalId = 'N/A';
          }

          if (valuer) {
            request.valuerId = valuer.valuerId;
            request.valuerNames = valuer.firstName.concat(' ').concat(valuer.lastName);
          } else {
            request.valuerId = 'N/A';
            request.valuerNames = 'N/A';
          }

          if (bailiff) {
            request.bailiffNames = bailiff.firstName.concat(' ').concat(bailiff.lastName);
          } else {
            request.bailiffNames = 'N/A';
          }
          if (request.evaluationType == EEvaluationType.COUNTER_EVALUATION) {
            request.evaluationType = this.translations.counter_evaluation;
          } else {
            request.evaluationType = this.translations.standard;
          }
        }
      });
      this.stateService.setState(mutation, { isLoading: false, data }); // set state
      this.initTable(data, page);
    } else {
      this.stateService.requests.isLoading = false;
    }
  }
  // on search change
  onSearchChange(e: string): void {
    if (!e || e.length == 0) {
      this.getUserRequests(true);
    } else if (e.length >= 10) {
      this.searchForm = this.initializeSearchForm();
      this.searchForm.search = e;
      this.getUserRequests(true, this.searchForm);
    }
  }

  // create inspection
  createRequest(): void {
    this.dialogRef = this.dialog.open(CreateRequestComponent, {
      width: '40%',
      disableClose: false
    });
    this.dialogRef.afterClosed().subscribe({});
    this.dialogRef.componentInstance.actionEvent.subscribe((res: IMessage) => {
      if (res.message) {
        this.message = res
      }
    });

  }

  filterByDates(event: IDateFilter): void {
    this.searchForm.startDate = event.startDate;
    this.searchForm.endDate = event.endDate;
    this.getUserRequests(true, this.searchForm);
  }

  // on pagination change
  onPagination(num: number): void {
    this.searchForm.start = (num - 1) * this.searchForm.length;
    this.getUserRequests(true, this.searchForm);
  }

  // trigger create inspection for the first time
  onNotFoundEvent(): void {
    this.router.navigateByUrl('/requests/requests/create');
  }

  // get inspections
  getUserRequests(refetch = false, search: RequestFilter = this.initializeSearchForm()): void {
    this.isFetching = true;
    this.searchForm = search;
    if (this.requests.length === 0 || refetch) {
      const mutation = EStatePartial.REQUESTS;
      this.stateService.setState(mutation); // set loading = true
      this.requestService.getUserRequests(search).subscribe((res: IResponseObject<IRequest[]>) => {
        this.processResponse(res, (search.start / search.length) + 1);
        if (refetch) {
          this.dataService.changeMessage(EStatePartial.STATISTICS);
        }
      });
    } else {
      this.initTable(this.requests);
    }
  }

  refresh(): void {
    this.getUserRequests(true);
  }

  // init inspections table
  initTable(data: any = null, page: number = 1): void {
    if (this.isAdmin) {
      this.requestsTable = {
        hasAction: false,
        fields: this.requestService.adminFields,
        data: data ? data : this.requests,
        page: page,
        filterType: EfilterType.REQUEST_STATUS
      }
    } else {
      this.requestsTable = {
        hasAction: true,
        fields: this.requestService.fields,
        data: data ? data : this.requests,
        page: page,
        filterType: EfilterType.REQUEST_STATUS
      }
    }
  }
}

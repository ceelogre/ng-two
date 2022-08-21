import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ESort } from 'src/app/provider/enum/sort.enum';
import { EApplicationState } from "../../../../provider/enum";
import { IDateFilter } from "../../../../provider/model/request-filter.model";
import { SearchForm } from "../../../../provider/model/search-form.model";
import { DataService } from "../../../../provider/service/data.service";
import { paginateSearch } from "../../../../provider/util/paginate.util";
import { IInspection, IRequest } from '../../providers/model/inspection.model';
import { EfilterType } from './../../../../provider/enum/filter-type.enum';
import { EStatePartial } from './../../../../provider/enum/state-partial.enum';
import { IMessage } from './../../../../provider/model/message.model';
import { IResponseObject } from './../../../../provider/model/response-object.model';
import { IDataSourceConfig } from './../../../../provider/model/table.model';
import { IUser } from './../../../../provider/model/user.model';
import { StateService } from './../../../../provider/service/state.service';
import { InspectionService } from './../../providers/service/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  routeState$: Observable<any>;
  message: IMessage;
  inspectionsTable: IDataSourceConfig;
  filterState: EApplicationState = null;
  subscription: Subscription;
  isFetching: boolean = false;
  searchForm: SearchForm;
  stringFilter: string = null;

  constructor(
    private stateService: StateService,
    private inspectionService: InspectionService,
    private route: ActivatedRoute,
    public dataService: DataService,
    private router: Router) {
    this.getMessageFromRoute();
  }

  ngOnInit(): void {
    this.searchForm = this.initializeSearchForm();
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      if (message == EStatePartial.SELECTED_INSPECTION.toString()) {
        this.getInspections(true);
      }
    });
    this.filterState = null;
    this.getInspections(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get inspections(): IInspection[] {
    return this.stateService.inspections.data;
  }

  get authUser(): IUser {
    return this.stateService.authUser.data;
  }

  get inspectionsLoading(): boolean {
    return this.stateService.inspections.isLoading;
  }

  get table() {
    return this.inspectionsTable;
  }

  get tableFiltering() {
    return !!this.searchForm?.endDate || !!this.searchForm?.startDate || !!this.searchForm?.state || !!this.stringFilter
  }

  get translations() {
    return this.dataService.translations
  }

  initializeSearchForm(): SearchForm {
    let search = paginateSearch();
    search.userId = this.dataService.localStorageFind();
    return search;
  }

  // get inspections
  getInspections(refetch = false, search: SearchForm = this.initializeSearchForm()): void {
    this.searchForm = search;
    search.sortDir = ESort.DESC;
    this.isFetching = true;
    if (this.inspections.length === 0 || refetch) {
      const mutation = EStatePartial.INSPECTIONS;
      this.stateService.setState(mutation); // set loading = true
      this.inspectionService.getUserVisits(search).subscribe((res: IResponseObject<IRequest[]>) => {
        this.isFetching = false;
        this.processResponse(res, (search.start / search.length) + 1);
      });
    } else {
      this.initTable(this.inspections);
    }
  }
  // on pagination change
  onPagination(num: number): void {
    this.searchForm.start = (num - 1) * this.searchForm.length;
    if (this.filterState && this.filterState != null) {
      this.searchForm.state = this.filterState;
      this.getFilteredResults(this.searchForm);
    } else {
      this.getInspections(true, this.searchForm);
    }
  }

  filterByDates(event: IDateFilter) {
    this.searchForm.startDate = event.startDate;
    this.searchForm.endDate = event.endDate;
    this.getInspections(true, this.searchForm);
  }
  // go inspection details
  toggleInspection({ id }): void {
    this.router.navigateByUrl('/inspections/request/' + id);
  }

  // get message from route
  getMessageFromRoute(): void {
    this.routeState$ = this.route.paramMap.pipe(map(() => window.history.state));
    this.routeState$.subscribe(data => {
      this.message = { message: data.message, error: false };
    });

  }

  // create inspection
  createInspection(): void {
    this.router.navigateByUrl('/inspections/request/create');
  }

  // on search change
  onSearchChange(e: string): void {
    this.stringFilter = e;
    if (!e || e.length == 0) {
      this.getInspections(true);
    } else if (e.length >= 10) {
      this.searchForm = this.initializeSearchForm();
      if (this.isAdmin) {
        this.searchForm.search = e;
        this.getInspections(true, this.searchForm);
      } else {
        const mutation = EStatePartial.INSPECTIONS;
        this.stateService.setState(mutation); // set loading = true
        this.inspectionService.getUserVisitsByParcel(e).subscribe((res: IResponseObject<IRequest[]>) => {
          this.isFetching = false;
          this.processResponse(res);
        });
      }
    }
  }

  // trigger create inspection for the first time
  onNotFoundEvent(): void {
    this.createInspection();
  }

  // listen to table click event
  onTableClickEvent(e: IInspection): void {
    const mutation = EStatePartial.SELECTED_INSPECTION;
    this.stateService.setState(mutation, { data: e, isLoading: false });
    this.router.navigateByUrl('/inspections/request/' + e.id);
  }

  // init inspections table
  initTable(data: any = null, page: number = 1): void {
    const fields = this.isAdmin ? this.inspectionService.adminFields : this.inspectionService.fields
    this.inspectionsTable = {
      hasAction: true,
      fields: fields,
      data: data ? data : this.inspections,
      page: page,
      filterType: EfilterType.APPLICATION_STATE
    }
  }

  filterResults(event: any): void {
    this.filterState = event;
    this.searchForm.state = event;
    this.getFilteredResults(this.searchForm);
  }

  get isAdmin(): boolean {
    return this.stateService.isAdmin;
  }

  getFilteredResults(searchForm: SearchForm): void {
    this.inspectionService.getUserVisitsByState(searchForm).subscribe((response: IResponseObject<IRequest[]>) => {
      this.processResponse(response);
    });
  }

  refresh(event: any): void {
    this.getInspections(true);
  }

  processResponse(response: IResponseObject<IRequest[]>, page: number = 1) {
    const mutation = EStatePartial.INSPECTIONS;
    this.stateService.setState(mutation); // set loading = true
    this.isFetching = false;
    if (response.status) {
      this.dataService.changeMessage(EStatePartial.STATISTICS.toString());
      const { data } = response;
      data.forEach((request, index) => {
        request.upi = request.parcel?.upi;
        request.propertyType = request.parcel?.landUse?.toLowerCase();
        request.location = request.parcel?.locationName;
        if (this.isAdmin) {
          const { user } = request;
          request.valuerId = user.valuerId;
          request.valuerNames = user.firstName.concat(' ').concat(user.lastName);
        }
      });
      this.stateService.setState(mutation, { isLoading: false, data }); // set state
      this.initTable(data, page);
    } else {
      this.stateService.inspections.isLoading = false;
      this.message.message = response.message;
      this.message.error = true;
    }
  }


}

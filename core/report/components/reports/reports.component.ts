import { DataService } from './../../../../provider/service/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { EfilterType, EStatePartial } from "../../../../provider/enum";
import { IDateFilter } from "../../../../provider/model/request-filter.model";
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { IDataSourceConfig } from "../../../../provider/model/table.model";
import { ReportService } from "../../../../provider/service/report.service";
import { StateService } from "../../../../provider/service/state.service";
import { IReport } from "../../provider/model/report.model";
import { SearchForm } from './../../../../provider/model/search-form.model';
import { ModalDialogService } from './../../../../provider/service/modal.service';
import { paginateSearch } from './../../../../provider/util/paginate.util';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  selectFormGroup: FormGroup;
  reportsTable: IDataSourceConfig;
  message: string;
  error: boolean = false;
  isFetching: boolean = false;
  reportType: string;
  searchForm: SearchForm;
  resetComponents = false;
  reportTypes: any[] = [];

  constructor(private fb: FormBuilder, private stateService: StateService,
    private reportService: ReportService, private modalService: ModalDialogService, private dataService: DataService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getUserReports();
    this.reportTypes = [
      {
        'label': this.translations.valuation_report,
        'value': 'VALUATION'
      },
      {
        'label': this.translations.statement_report,
        'value': 'STATEMENT'
      },
      {
        'label': this.translations.token_report,
        'value': 'TOKENS'
      }
    ]
  }

  initializeForm(): void {
    this.selectFormGroup = this.fb.group({
      startDateCtrl: new FormControl(null, [Validators.required]),
      endDateCtrl: new FormControl(null, [Validators.required])
    });
    this.searchForm = paginateSearch();
  }

  get reportsLoading(): boolean {
    return this.stateService.reports.isLoading;
  }

  get reports(): IReport[] {
    return this.stateService.reports.data;
  }

  get isAdmin() {
    return this.stateService.isAdmin
  }

  get translations() {
    return this.dataService.translations
  }

  setReportType(event): void {
    this.reportType = event;
  }
  // on pagination change
  onPagination(num: number): void {
    this.getUserReports(true, num);
  }

  createReport(event: IDateFilter): void {
    this.searchForm.startDate = event.startDate;
    this.searchForm.endDate = event.endDate;
    this.create(event);
  }

  create(event: IDateFilter): void {
    this.isFetching = true;
    this.reportService.create(event.startDate, event.endDate, this.reportType).subscribe((response: IResponseObject<any>) => {
      this.message = response.message;
      this.isFetching = false;
      this.resetComponentsFunc();
      if (response.status) {
        this.error = false;
        this.getUserReports(true);
      } else {
        this.error = true;
      }
    })
  };

  // get inspections
  getUserReports(refetch = false, page: number = 1): void {
    if (this.reports.length === 0 || refetch) {
      const mutation = EStatePartial.REPORTS;
      this.stateService.setState(mutation); // set loading = true
      this.reportService.getUserReports(page).subscribe((res: IResponseObject<IReport[]>) => {
        this.processResponse(res, page);
      });
    } else {
      this.initTable(this.reports);
    }
  }

  handleError(event): void {
    if (event == EfilterType.REPORT) {
      this.message = this.translations.download_error;
      this.error = true;
    }
  }

  // init users table
  initTable(data: any = null, page?: number): void {
    this.reportsTable = {
      hasAction: true,
      fields: this.reportService.fields,
      data: data ? data : this.reports,
      page: page || 1,
      filterType: EfilterType.REPORT
    }
  }

  processResponse(response: IResponseObject<IReport[]>, page: number = 1): void {
    const mutation = EStatePartial.REPORTS;
    this.stateService.setState(mutation); // set loading = true
    if (response.status) {
      const { data } = response;
      data.forEach((report, index) => {
        report.status = 'download';
        report.index = index + 1;
        report.title = new Date(report.startDate).toLocaleDateString() + ' - ' + new Date(report.endDate).toLocaleDateString();
      });
      this.stateService.setState(mutation, { isLoading: false, data }); // set state
      this.initTable(data, page);
    }
  }

  // open date filter dialog
  openDateDialog(): void {
    this.modalService.openDateDialog(this.searchForm?.startDate, this.searchForm?.endDate);
    this.modalService.dialogRef.componentInstance.onEmit.subscribe((res: IDateFilter) => {
      this.createReport(res);
    });
  }

  // reset components
  resetComponentsFunc(): void {
    if (this.isAdmin) {
      this.reportType = null;
      this.searchForm.startDate = null;
      this.searchForm.endDate = null;
    }
  }

}

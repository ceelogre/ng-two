import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ITransaction } from "../../../core/credit/providers/model/transaction.model";
import { TransactionService } from "../../../core/credit/providers/service/credit.service";
import { IRequest } from "../../../core/job/providers/model/inspection.model";
import { IReport } from "../../../core/report/provider/model/report.model";
import { RequestService } from "../../../core/request/components/provider/service/request.service";
import { EApplicationState, EStatePartial } from "../../../provider/enum";
import { IResponseObject } from "../../../provider/model/response-object.model";
import { ReportService } from "../../../provider/service/report.service";
import { StateService } from "../../../provider/service/state.service";
import { paginateRequest } from "../../../provider/util/paginate.util";
import { EfilterType } from './../../../provider/enum/filter-type.enum';
import { EInspectionStatus } from './../../../provider/enum/inspection-status.enum';
import { ETransactionStatus } from './../../../provider/enum/transaction.enum';
import { EUserStatus } from './../../../provider/enum/user-status.emun';
import { IGenValue } from './../../../provider/model/status.model';
import { DataService } from './../../../provider/service/data.service';

@Component({
  selector: 'irpv-status-display',
  templateUrl: './irpv-status-display.component.html',
  styleUrls: ['./irpv-status-display.component.css']
})

export class IrpvStatusDisplayComponent implements OnInit, OnChanges {
  @Input() input: EInspectionStatus | EUserStatus = EUserStatus.ACTIVE; // used when it's a lebel
  @Input() isFilter: boolean = false; // display a drop down when is filter is true or a badge when false
  @Input() type = EfilterType.USER_STATUS; // default filter/badge type
  @Input() request: IRequest | IReport | ITransaction;
  @Input() showActions = true;
  @Output() onSelected = new EventEmitter<EInspectionStatus | EUserStatus>();
  @Output() onError = new EventEmitter<EfilterType>();
  data: IGenValue<EInspectionStatus | EUserStatus | EApplicationState | ETransactionStatus>[];
  iconPosition: string;
  loading = [false, false, false, false, false, false]; // summary, receipt, new-valuer, approve, refresh, excel-report loaders

  constructor(private dataService: DataService, private stateService: StateService,
    private requestService: RequestService,
    private reportService: ReportService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.startUP();
  }


  approve(): void {
    this.loading[3] = true;
    this.requestService.approve(this.request.id).subscribe((response: IResponseObject<any>) => {
      this.loading[3] = false;
      this.processResponse(response);
    });
  }

  get isReport(): boolean {
    return this.type == EfilterType.REPORT;
  }

  get translations() {
    return this.dataService.translations
  }

  getNewValuer(): void {
    this.loading[2] = true;
    this.requestService.getNewValuer(this.request.id).subscribe((response: IResponseObject<any>) => {
      this.loading[2] = false;
      this.processResponse(response);
    });
  }

  processResponse(response: IResponseObject<any>): void {
    if (response.status) {
      this.requestService.getUserRequests(paginateRequest()).subscribe((res: IResponseObject<IRequest[]>) => {
        this.dataService.changeMessage(EStatePartial.STATISTICS.toString());
        this.dataService.changeMessage(EStatePartial.REQUEST.toString());
      });
    }
  }

  downloadExcelReport(): void {
    let req = this.request as IReport;
    const startDate: string = new Date(req.startDate)?.toLocaleDateString();
    const endDate: string = new Date(req.endDate)?.toLocaleDateString();
    const title = 'Report_from'.concat(startDate).concat(' _to_ ').concat(endDate);
    this.loading[5] = true;
    this.reportService.getReport(this.request.id).subscribe((response: IResponseObject<any>) => {
      this.loading[5] = false;
      if (response.status) {
        const sampleArr = this.reportService.base64ToArrayBuffer(response.data);
        this.reportService.saveByteArray({
          baseName: title,
          extension: 'xlsx'
        }, sampleArr);
      } else {
        this.onError.emit(EfilterType.REPORT);
      }
    });
  }

  displayBailiffRefresh(): boolean {
    return this.showActions && (this.type == EfilterType.REQUEST_STATUS) && (this.input == EInspectionStatus.PENDING) && this.stateService.isBailiff;
  }

  displayDownloadPdfReport(): boolean {
    return this.showActions && this.displayValuerRequestDownload() || this.displayValuerInspectionsDownload();
  }

  displayValuerRequestDownload(): boolean {
    return this.showActions && (this.type == EfilterType.REQUEST_STATUS) && (this.input == EInspectionStatus.COMPLETED) && this.stateService.isValuer;
  }

  displayValuerInspectionsDownload(): boolean {
    return this.showActions && (this.type == EfilterType.APPLICATION_STATE) && (EApplicationState[this.input] == EApplicationState.CLOSED) && this.stateService.isValuer;
  }

  displayDownloadReceipt(): boolean {
    return this.showActions && (this.type == EfilterType.CREDIT_STATUS) && (this.input == EInspectionStatus.SUCCESSFUL);
  }

  downloadReceipt() {
    if (this.type == EfilterType.CREDIT_STATUS) {
      let payment = this.request as ITransaction;
      this.loading[1] = true;
      this.reportService.downloadPaymentReceipt(payment.financialTransactionId).subscribe((response: IResponseObject<any>) => {
        this.loading[1] = false;
        if (response.status) {
          const sampleArr = this.reportService.base64ToArrayBuffer(response.data);
          this.reportService.saveByteArray({
            baseName: 'Payment Receipt No '.concat(payment.financialTransactionId),
            extension: 'pdf'
          }, sampleArr);
        } else {
          this.onError.emit(EfilterType.CREDIT_STATUS);
        }
      });
    }
  }

  downloadSummaryDoc() {
    let siteVisitId: string;
    if (this.type == EfilterType.REQUEST_STATUS) {
      let site = this.request as IRequest;
      siteVisitId = site.siteVisitId;
    } else {
      siteVisitId = this.request.id;
    }
    this.loading[0] = true;
    this.reportService.downloadSummaryPdfReport(siteVisitId).subscribe((response: IResponseObject<any>) => {
      this.loading[0] = false;
      if (response.status) {
        const sampleArr = this.reportService.base64ToArrayBuffer(response.data);
        this.reportService.saveByteArray({
          baseName: 'valuation report',
          extension: 'pdf'
        }, sampleArr);
      } else {
        this.onError.emit(EfilterType.REPORT);
      }
    })
  }

  displayValuerAction(): boolean {
    return (this.type == EfilterType.REQUEST_STATUS) && (this.input == EInspectionStatus.PENDING) && this.stateService.isValuer;
  }

  displayRefreshPayment(): boolean {
    return (this.type == EfilterType.CREDIT_STATUS) && (this.input == EInspectionStatus.PENDING);
  }

  refreshPayment(): void {
    this.loading[4] = true;
    this.transactionService.getPaymentDetails(this.request.id).subscribe((response: IResponseObject<any>) => {
      this.loading[4] = false;
      if (response.status) {
        this.dataService.changeMessage(EStatePartial.TRANSACTIONS.toString());
      }
    })
  }
  // start up
  startUP(): void {
    this.iconPosition = 'left';
    if (this.type) {
      this.data = this.dataService.getStatusByType(this.type);
    }
  }

  // track changes in props
  ngOnChanges(simpleChange: SimpleChanges): void {
    if (simpleChange?.isFilter) {
      this.isFilter = simpleChange?.isFilter.currentValue;
    }
    if (simpleChange?.type) {
      this.type = simpleChange?.type.currentValue;
      this.startUP();
    }

  }

  // emit on selected
  emitSelected(e: EUserStatus | EInspectionStatus): void {
    this.onSelected.emit(e);
  }


}

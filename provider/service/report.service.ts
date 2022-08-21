import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { paginateSearch } from "../util/paginate.util";
import { environment } from "../../../environments/environment";
import { DataService } from "./data.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ItableField } from "../model/table.model";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private dataService: DataService,
    private httpClient: HttpClient) { }

  get translations() {
    return this.dataService.translations;
  }

  reportUrl = environment.irpv_api + '/restricted/report';

  fields: ItableField[] = [
    {
      name: 'ID',
      key: 'index',
      isId: true
    },
    {
      name: this.translations.export_date,
      key: 'createdAt',
      isDate: true
    },
    {
      name: this.translations.report_type,
      key: 'reportType'
    },
    {
      name: this.translations.report_period,
      key: 'title'
    },
    {
      name: this.translations.action,
      key: 'status',
      isStatus: true,
      isActionable: true
    }
  ]

  create(startDate: string, endDate: string, reportType: string = 'VALUATION'): Observable<any> {
    const url = this.reportUrl + '/create';
    const headers = new HttpHeaders().set('startDate', new Date(startDate).toDateString()).set('endDate', new Date(endDate).toDateString()).set('userId', this.dataService.localStorageFind()).set('reportType', reportType);
    return this.httpClient.post(url, null, { headers });
  }

  getReport(reportId: string): Observable<any> {
    const url = this.reportUrl + '/download';
    const headers = new HttpHeaders().set('reportId', reportId).set('userId', this.dataService.localStorageFind());

    return this.httpClient.get(url, { headers });

  }

  downloadSummaryPdfReport(siteVisitId: string): Observable<any> {
    const url = environment.irpv_api + '/restricted/document/generate';
    const headers = new HttpHeaders().set('siteVisitId', siteVisitId);

    return this.httpClient.get(url, { headers });
  }

  downloadPaymentReceipt(financialTransactionId: string): Observable<any> {
    const url = environment.irpv_api + '/restricted/document/generate/cash-receipt';
    const headers = new HttpHeaders().set('financialTransactionId', financialTransactionId);

    return this.httpClient.get(url, { headers });
  }

  downloadPaymentStatement(userId: string, startDate: string, endDate: string): Observable<any> {
    const url = environment.irpv_api + '/restricted/document/generate/account-statement-history';
    const headers = new HttpHeaders().set('userId', userId).set('startDate', startDate).set('endDate', endDate);

    return this.httpClient.get(url, { headers });
  }

  getUserReports(page: number = 0): Observable<any> {
    const url = this.reportUrl + '/user';
    let searchForm = paginateSearch();

    searchForm.userId = this.dataService.localStorageFind();
    searchForm.sort = 'createdAt';

    if (page > 0) {
      searchForm.start = (page - 1) * searchForm.length;
    }

    return this.httpClient.post(url, searchForm);
  }

  base64ToArrayBuffer(base64): Uint8Array {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  saveByteArray(reportName, byte): void {
    let blob = {};
    switch (reportName.extension) {
      case 'pdf':
        blob = new Blob([byte], { type: 'application/pdf' });
        break;
      case 'jpg':
        blob = new Blob([byte], { type: 'image/jpg' });
        break;
      case 'jpeg':
        blob = new Blob([byte], { type: 'image/jpeg' });
        break;
      case 'png':
        blob = new Blob([byte], { type: 'image/png' });
        break;
      case 'xls':
        blob = new Blob([byte], { type: 'application/vnd.ms-excel' });
        break;
      case 'xlsx':
        blob = new Blob([byte], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        break;
      default:
        break;
    }
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = reportName.baseName + '.' + reportName.extension;
    link.download = fileName;
    link.click();
  }

}

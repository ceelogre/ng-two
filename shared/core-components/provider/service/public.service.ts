import { environment } from './../../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PublicService {
  publicurl = environment.irpv_api + '/public'
  constructor(private http: HttpClient) { }

  // fetch upi
  getParcel(upi: string): Observable<any> {
    const url = this.publicurl + '/parcel/upi';
    const headers = new HttpHeaders().set('upi', upi);
    return this.http.get(url, { headers });
  }

  // create public request
  createPublicRequest(parcelId: string, phoneNumber: string, nationaID: string): Observable<any> {
    const url = this.publicurl + '/requests/create';
    const headers = new HttpHeaders().set('parcelId', parcelId).set('phoneNUmber', `${phoneNumber}`)
      .set('nationalId', nationaID);
    return this.http.post(url, {}, { headers });
  }

  // verify receipt
  verifyReceipt(financialTransactionId: string): Observable<any> {
    const url = this.publicurl + '/verify/receipt';
    const headers = new HttpHeaders().set('financialTransactionId', financialTransactionId);
    return this.http.get(url, { headers });
  }

  // verify receipt
  verifyReport(siteVisitId: string): Observable<any> {
    const url = this.publicurl + '/verify/report';
    const headers = new HttpHeaders().set('siteVisitId', siteVisitId);
    return this.http.get(url, { headers });
  }

  // verify document
  verifyReportGenerate(reportNumber: string): Observable<any> {
    const url = this.publicurl + '/verify/report/generate';
    const headers = new HttpHeaders().set('reportNumber', reportNumber);
    return this.http.get(url, { headers });
  }


}

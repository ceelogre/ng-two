import { ItableField } from './../../../../provider/model/table.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { DataService } from "../../../../provider/service/data.service";
import { ICreatePaymentDto } from "../../../../provider/model/user.model";
import { SearchForm } from "../../../../provider/model/search-form.model";

@Injectable()
export class TransactionService {

  paymentUrl = environment.irpv_api + '/restricted/payment';
  fields: ItableField[] = [
    {
      name: 'ID',
      key: 'index',
      isId: true
    },
    {
      name: this.translations.date,
      key: 'createdAt',
      isDate: true
    },
    {
      name: this.translations.amount,
      key: 'amount',
      isMoney: true
    },
    {
      name: this.translations.status,
      key: 'status',
      isStatus: true,
      isActionable: true
    }
  ]

  adminFields: ItableField[] = [
    {
      name: this.translations.date,
      key: 'createdAt',
      isDate: true
    },
    {
      name: this.translations.category,
      key: 'category'
    },
    {
      name: this.translations.names,
      key: 'names'
    },
    {
      name: this.translations.valuer_id,
      key: 'valuerId'
    },
    {
      name: this.translations.amount,
      key: 'amount',
      isMoney: true
    },
    {
      name: this.translations.status,
      key: 'status',
      isStatus: true,
      isActionable: true
    }
  ]

  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  get translations() {
    return this.dataService.translations;
  }

  // get recent transactions
  getUserTransactions(searchForm: SearchForm): Observable<any> {
    const url = this.paymentUrl + '/user/all';
    return this.httpClient.post(url, searchForm);
  }

  createPayment(dto: ICreatePaymentDto): Observable<any> {
    const url = this.paymentUrl + '/create';
    return this.httpClient.post(url, dto);
  }

  getPaymentDetails(paymentTrxId: string): Observable<any> {
    const url = this.paymentUrl + '/status';
    const headers = new HttpHeaders().set('paymentTrxId', paymentTrxId);
    return this.httpClient.get(url, { headers });
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { DataService } from "../../../../provider/service/data.service";
import { environment } from './../../../../../environments/environment';
import { SearchForm } from './../../../../provider/model/search-form.model';
import { ItableField } from './../../../../provider/model/table.model';
import { IWithdraw } from './../model/withdraw.model';

@Injectable()
export class WithdrawService {

  url = environment.irpv_api + '/admin';

  fields: ItableField[] = [
    {
      name: this.translations.withdrawal_date,
      key: 'withdrawDate',
      isDate: true
    },
    {
      name: this.translations.amount,
      key: 'amount',
      isMoney: true
    },
    {
      name: this.translations.names,
      key: 'names'
    },
  ]

  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  get translations() {
    return this.dataService.translations;
  }

  // create a withdraw
  create(request: IWithdraw): Observable<any> {
    const url = this.url + '/withdraw/create';
    return this.httpClient.post<IResponseObject<IWithdraw>>(url, request);
  }

  // get all withdraws
  getAllWithdraw(searchForm: SearchForm): Observable<any> {
    const url = this.url + '/withdraw/all';
    return this.httpClient.post(url, searchForm);
  }

}

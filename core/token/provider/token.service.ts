import { catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from "../../../provider/service/data.service";
import { ICreateToken } from "../../../provider/model/status.model";
import { ItableField } from "../../../provider/model/table.model";
import { SearchForm } from "../../../provider/model/search-form.model";

@Injectable()
export class TokenService {

  locationUrl = environment.irpv_api + '/public/location';
  ticketUrl = environment.irpv_api + '/valuer/ticket';
  fields: ItableField[] = [
    {
      name: this.translations.date,
      key: 'createdAt',
      isDate: true
    },
    {
      name: this.translations.location,
      key: 'locationName'
    },
    {
      name: this.translations.amount,
      key: 'cost',
      isMoney: true
    },
    {
      name: this.translations.remaining,
      key: 'remainingTickets'
    },
    {
      name: this.translations.tickets,
      key: 'numberOfTickets'
    }
  ]

  adminFields: ItableField[] = [
    {
      name: this.translations.date,
      key: 'createdAt',
      isDate: true
    },
    {
      name: this.translations.valuer_names,
      key: 'valuerNames'
    },
    {
      name: this.translations.valuer_id,
      key: 'valuerId'
    },
    {
      name: this.translations.location,
      key: 'locationName'
    },
    {
      name: this.translations.amount,
      key: 'cost',
      isMoney: true
    },
    {
      name: this.translations.tickets,
      key: 'numberOfTickets'
    },
    {
      name: this.translations.remaining,
      key: 'remainingTickets'
    }
  ]

  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  get translations() {
    return this.dataService.translations;
  }


  // get provinces
  getProvinces(): Observable<any> {
    const url = this.locationUrl + '/provinces';
    return this.httpClient.get(url);
  }

  getUserTickets(searchForm: SearchForm): Observable<any> {
    const url = this.ticketUrl + '/user/all';
    searchForm.sort = 'remainingTickets';
    return this.httpClient.post(url, searchForm);
  }

  createTicket(dto: ICreateToken): Observable<any> {
    const url = this.ticketUrl + '/create';
    dto.userId = this.dataService.localStorageFind();
    return this.httpClient.post(url, dto).pipe(catchError(err => err));
  }
}

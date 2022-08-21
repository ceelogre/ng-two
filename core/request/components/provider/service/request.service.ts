import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { Observable } from "rxjs";
import { StateService } from "../../../../../provider/service/state.service";
import { DataService } from "../../../../../provider/service/data.service";
import { ItableField } from "../../../../../provider/model/table.model";
import { RequestFilter } from "../../../../../provider/model/request-filter.model";

@Injectable()
export class RequestService {

  valuerRequestsUrl = environment.irpv_api + '/valuer';
  bailiffRequestsUrl = environment.irpv_api + '/bailiff';
  adminRequestUrl = environment.irpv_api + '/admin';

  fields: ItableField[] = [
    {
      name: this.translations.date,
      key: 'createdAt',
      isDate: true
    },
    {
      name: this.translations.upi,
      key: 'upi',
    },
    {
      name: this.translations.land_use,
      key: 'propertyType'
    },
    {
      name: this.translations.location,
      key: 'location'
    },
    {
      name: this.translations.status,
      key: 'status',
      isStatus: true,
      isActionable: true,
    }
  ]

  adminFields: ItableField[] = [
    {
      name: this.translations.date,
      key: 'createdAt',
      isDate: true
    },
    {
      name: this.translations.type,
      key: 'evaluationType'
    },
    {
      name: this.translations.requester_id,
      key: 'nationalId'
    },
    {
      name: this.translations.bailiff,
      key: 'bailiffNames'
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
      name: this.translations.upi,
      key: 'upi',
    },
    {
      name: this.translations.land_use,
      key: 'propertyType'
    },
    {
      name: this.translations.location,
      key: 'location'
    },
    {
      name: this.translations.status,
      key: 'status',
      isStatus: true,
      isActionable: true,
    }
  ]

  constructor(private httpClient: HttpClient, private stateService: StateService,
    private dataService: DataService) { }

  get translations() {
    return this.dataService.translations;
  }


  create(parcelId: string, userId: string = null): Observable<any> {
    let url;
    let headers;
    if (this.stateService.isAdmin) {
      url = this.adminRequestUrl + '/valuation/create/counter';
      headers = new HttpHeaders().set('parcelId', parcelId).set('userId', userId);
    } else if (this.stateService.isBailiff) {
      url = this.bailiffRequestsUrl + '/request/create';
      headers = new HttpHeaders().set('parcelId', parcelId).set('bailiffId', this.dataService.localStorageFind());
    }


    return this.httpClient.post(url, null, { headers });
  }

  getUserRequests(requestForm: RequestFilter): Observable<any> {
    let url;
    if (this.stateService.isValuer) {
      url = this.valuerRequestsUrl + '/requests';
      requestForm.valuerId = this.dataService.localStorageFind();
    } else if (this.stateService.isBailiff) {
      url = this.bailiffRequestsUrl + '/requests';
      requestForm.baillifId = this.dataService.localStorageFind();
    } else if (this.stateService.isAdmin) {
      url = this.adminRequestUrl + '/requests/all';
    }

    return this.httpClient.post(url, requestForm);
  }

  getUserRequestsByState(requestFilter: RequestFilter): Observable<any> {
    let url;
    if (this.stateService.isValuer) {
      url = this.valuerRequestsUrl + '/requests';
      requestFilter.valuerId = this.dataService.localStorageFind();
    } else if (this.stateService.isBailiff) {
      url = this.bailiffRequestsUrl + '/requests';
      requestFilter.baillifId = this.dataService.localStorageFind();
    } else if (this.stateService.isAdmin) {
      url = this.adminRequestUrl + '/requests/all';
    }

    return this.httpClient.post(url, requestFilter);
  }

  approve(requestId: string): Observable<any> {
    const url = this.valuerRequestsUrl + '/approve';
    const headers = new HttpHeaders().set('requestId', requestId);

    return this.httpClient.post(url, null, { headers });
  }

  getNewValuer(requestId: string): Observable<any> {
    let url;
    const headers = new HttpHeaders().set('requestId', requestId);
    if (this.stateService.isValuer) {
      url = this.valuerRequestsUrl + '/reassign';
    } else if (this.stateService.isBailiff) {
      url = this.bailiffRequestsUrl + '/reassign';
    }

    return this.httpClient.post(url, null, { headers })
  }
}

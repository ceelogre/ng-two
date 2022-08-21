import { IValuation } from './../model/valuation.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { RequestFilter } from './../../../../provider/model/request-filter.model';
import { ItableField } from './../../../../provider/model/table.model';
import { DataService } from "../../../../provider/service/data.service";
import { SearchForm } from "../../../../provider/model/search-form.model";
import {IInspectionDto, IUpdateInspectionDto} from "../../../../provider/model/user.model";

@Injectable()
export class InspectionService {

  url = environment.irpv_api + '/restricted';
  valuerUrl = environment.irpv_api + '/valuer';

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
      name: this.translations.property_type,
      key: 'propertyType'
    },
    {
      name: this.translations.location,
      key: 'location'
    },
    {
      name: this.translations.status,
      key: 'state',
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
      name: this.translations.property_type,
      key: 'propertyType'
    },
    {
      name: this.translations.location,
      key: 'location'
    },
    {
      name: this.translations.status,
      key: 'state',
      isStatus: true,
      isActionable: true
    },
    {
      name: 'Report No',
      key: 'reportNumber'
    }
  ]

  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  get translations() {
    return this.dataService.translations;
  }

  // get valuer site visits
  getUserVisits(searchForm: SearchForm): Observable<any> {
    searchForm.sort = 'createdAt';
    const url = this.url + '/visit/user';
    return this.httpClient.post(url, searchForm);
  }
  // get valuer site visits
  getUserVisitsByState(payload: SearchForm): Observable<any> {
    payload.sort = 'createdAt';
    const url = this.url + '/visit/user';
    return this.httpClient.post(url, payload);
  }

  // get valuer site visits
  getUserVisitsByParcel(upi: string): Observable<any> {
    const url = this.url + '/visit/user/parcel';
    const headers = new HttpHeaders().set('userId', this.dataService.localStorageFind()).set('upi', upi);
    return this.httpClient.get(url, {headers});
  }


  // get valuer requests
  getRequestsByValuer(request: RequestFilter): Observable<any> {
    const url = this.url + '/requests';
    return this.httpClient.post(url, request);
  }

  // get requests by valuer and parcel
  getRequestsByValuerAndParcel(request: RequestFilter): Observable<any> {
    const url = this.url + '/requests/parcel';
    return this.httpClient.post(url, request);
  }

  // reassign request
  reAssign(requestId: string): Observable<any> {
    const url = this.url + '/reassign';
    const headers = new HttpHeaders().set('requestId', requestId);
    return this.httpClient.post(url, {}, { headers });
  }

  // job approve
  jobApprove(requestId: string): Observable<any> {
    const url = this.url + '/approve';
    const headers = new HttpHeaders().set('requestId', requestId);
    return this.httpClient.post(url, {}, { headers });
  }

  // create request
  create(inspectionDto: IInspectionDto): Observable<any> {
    const url = this.url + '/visit/create';
    return this.httpClient.post(url, inspectionDto);
  }

  // edit inspection
  update(inspectionDto:IUpdateInspectionDto): Observable<any> {
    const url = this.url + '/visit/edit';
    return this.httpClient.post(url, inspectionDto);
  }

  // create valuation request
  createValuation(request: IValuation): Observable<any> {
    const url = this.valuerUrl + '/valuation/create';
    return this.httpClient.post(url, request);
  }

  // create valuation request
  editValuation(request: IValuation): Observable<any> {
    const url = this.valuerUrl + '/valuation/edit';
    return this.httpClient.post(url, request);
  }

  // get valuation
  getValuation(siteVisitId: string): Observable<any> {
    const url = this.valuerUrl + '/valuation/site-visit';
    const headers = new HttpHeaders().set('siteVisitId', siteVisitId);
    return this.httpClient.get(url, { headers });
  }

  //! [mocks] get recent jobs
  getInspectionById(id: string): Observable<any> {
    const url = this.url + '/jobs/' + id;
    return this.httpClient.get(url);
  }

  //! [mocks] get recent jobs by id
  getParcelById(id: string): Observable<any> {
    const url = this.url + '/parcels?upi=' + id;
    return this.httpClient.get(url);
  }


}

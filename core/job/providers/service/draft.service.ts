import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from './../../../../../environments/environment';
import {IDraft} from './../model/draft.model';

@Injectable()
export class DraftService {

  url = environment.irpv_api + '/restricted/draft';

  constructor(private httpClient: HttpClient) { }


  // create draft
  createDraft(request: IDraft): Observable<any> {
    const url = this.url + '/create';
    return this.httpClient.post(url, request);
  }

  // get draft by visits
  getBySiteVisits(siteVisitId: string): Observable<any> {
    const url = this.url + '/site-visit-id';
    const headers = new HttpHeaders().set('siteVisitId', siteVisitId);
    return this.httpClient.get(url, { headers });
  }

  // create draft
  updateDraft(request: IDraft): Observable<any> {
    const url = this.url + '/update';
    return this.httpClient.post(url, request);
  }

}

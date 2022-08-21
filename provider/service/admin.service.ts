import { EUserStatus } from './../enum/user-status.emun';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { IResponseObject } from './../model/response-object.model';
import { IUser } from './../model/user.model';
import { paginateSearch } from './../util/paginate.util';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminUrl = environment.irpv_api + '/admin';

  constructor(private httpClient: HttpClient) { }

  getUsers(page: number = 0, state?: any): Observable<any> {
    const url = this.adminUrl + '/user/all'
    let paginate = paginateSearch();
    if(state){
      paginate.status = state;
    }
    if (page > 0) {
      paginate.start = (page - 1) * paginate.length;
    }
    return this.httpClient.post<IResponseObject<IUser>>(url, paginate);
  }

  searchUsers(search: string): Observable<any>{
    const url = this.adminUrl + '/user/all'
    let paginate = paginateSearch();
    paginate.search = search;
    return this.httpClient.post<IResponseObject<IUser>>(url, paginate);

  }

  // create user
  createUser(request: IUser): Observable<any> {
    const url = this.adminUrl + '/user/create';
    return this.httpClient.post<IResponseObject<IUser>>(url, request);
  }
}

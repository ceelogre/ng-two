import { IPasswordRequest } from './../../../../provider/model/user.model';
import { ItableField } from './../../../../provider/model/table.model';
import { Injectable } from '@angular/core';
import { IUser } from "../../../../provider/model/user.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { environment } from "../../../../../environments/environment";
import { DataService } from "../../../../provider/service/data.service";

@Injectable()
export class UserService {

  fields: ItableField[] = [
    {
      name: this.translations.first_name,
      key: 'firstName'
    },
    {
      name: this.translations.last_name,
      key: 'lastName',
    },
    {
      name: this.translations.category,
      key: 'role',
      isRole: true
    },
    {
      name: this.translations.email,
      key: 'email'
    },
    {
      name: this.translations.status,
      key: 'status',
      isStatus: true
    }
  ]

  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  get translations() {
    return this.dataService.translations;
  }

  // update user
  updateUser(request: IUser): Observable<any> {
    const url = environment.irpv_api + '/restricted/user/update';
    const headers = new HttpHeaders().set('userId', this.dataService.localStorageFind())
    return this.httpClient.post<IResponseObject<IUser>>(url, request, { headers });
  }

  //  get users by type
  getUserByType(type: string): Observable<any> {
    const url = environment.irpv_api + '/admin/user/type';
    const headers = new HttpHeaders().set('userType', type);
    return this.httpClient.get(url, { headers });
  }

  // update user password
  updatePassword(request: IPasswordRequest): Observable<any> {
    const url = environment.irpv_api + '/restricted/user/update/password';
    return this.httpClient.post<IResponseObject<IUser>>(url, request);
  }


}

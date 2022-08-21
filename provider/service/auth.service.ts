import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { ILoginRequest } from './../../core/auth/components/provider/model/login-request.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = environment.irpv_api + '/auth';
  userUrl = environment.irpv_api + '/restricted/user';
  publicUrl = environment.irpv_api + '/public';

  constructor(private httpClient: HttpClient, private data: DataService) { }

  // login
  login(request: ILoginRequest): Observable<any> {
    const url = this.authUrl + '/login';
    return this.httpClient.post(url, request);
  }

  // get auth user by id
  getUserById(): Observable<any> {
    const headers = new HttpHeaders().set('userId', this.data.localStorageFind());
    const url = this.userUrl + '/details';
    return this.httpClient.get(url, { headers });
  }

  // reset pwd
  resetPwd(username: string, code: string): Observable<any> {
    const url = this.publicUrl + '/user/password/reset';
    const headers = new HttpHeaders().set('username', username).set('otp', code);
    return this.httpClient.post(url, {}, { headers });
  }

  // send code
  sendCode(username: string): Observable<any> {
    const url = this.publicUrl + '/user/password/otp';
    const headers = new HttpHeaders().set('username', username);
    return this.httpClient.post(url, {}, { headers });
  }

}

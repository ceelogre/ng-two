import { DataService, EStorageFields } from './../service/data.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _data: DataService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        ...(request.url.indexOf('/auth/login') === -1 && {
          Authorization: `${this._data.localStorageFind(EStorageFields.TOKEN)}`
        }),
        'Accept-Language': `${this._data.localStorageFind(EStorageFields.LANGUAGE)}`
      }
    });
    return next.handle(request);
  }
}

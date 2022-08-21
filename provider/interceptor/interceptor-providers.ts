import {HttpErrorInterceptor} from './http-error.interceptor';
import {AuthInterceptor} from './auth.interceptor';
import {HTTP_INTERCEPTORS} from '../../../../node_modules/@angular/common/http';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
];

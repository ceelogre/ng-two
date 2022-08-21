import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, filter, retry } from 'rxjs/operators';
import { DataService } from './../service/data.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    private dataService: DataService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        let erroMsg = null;
        switch (error.status) {
          case 401:
            const username = this.dataService.getUsername()
            this.dataService.clearAll();
            this.router.navigate(['auth'], {
              replaceUrl: true,
              queryParams: { returnUrl: 'returlUrl' },
              state: {
                username,
                url: {},
                message: 'Access Denied! We logged you out because of your session has expired or we detected an authorized request, Kindly enter your password and loggin again.'
              }
            });
            break;
          case 403:
          case 404:
            erroMsg = 'Error occurred!, Resources you are trying to access are not found, consider contacting the admin';
            break;
          case 500:
          case 502:
            erroMsg = 'Something went wrong!, contact the admin to report the issue as soon as possible';
            break;
          case 0:
          case 408:
            erroMsg = 'Error occurred!, It might be caused by slow internet, consider refreshing this page or contact the admin.';
            break;
        }
        return throwError({ erroMsg });
      })
    );
  }
}

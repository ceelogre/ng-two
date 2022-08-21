import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DataService} from "../../../../provider/service/data.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  paymentUrl = environment.irpv_api + '/restricted/stats';

  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  getUserStatistics(): Observable<any>{
    const headers = new HttpHeaders().set('userId', this.dataService.localStorageFind());
    const url = this.paymentUrl + '/user';

    return this.httpClient.get(url,{headers});



  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IUser } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { StateService } from './../service/state.service';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<IUser> {
  constructor(private authService: AuthService, private state: StateService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
    return this.state?.authUser?.data ? null : this.authService.getUserById();
  }

}


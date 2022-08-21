import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {EUserRole} from './../enum/user-role.enum';
import {DataService} from './../service/data.service';
import {navigationHandler} from './../util/navigate.utli';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private data: DataService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    if (!this.data.isAuthenticated) {
      this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
      return;
    }
    if (!this.isAllowed(route.data?.roles)) {
      this.router.navigateByUrl(navigationHandler(this.data.getRole()));
      return;
    }
    return true;
  }

  // check if selected role is allowed to routes
  isAllowed(arr: EUserRole[]): boolean {
    try {
      return arr.map(item => item).some(r => this.data.getRole().indexOf(r) >= 0);
    } catch (ex: any) {
      this.data.clearAll();
      this.router.navigate(['/auth']);
    }
  }

}

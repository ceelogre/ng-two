import {Routes} from '@angular/router';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent
      },
      {
        path: '',
        redirectTo: '/auth/login'
      }
    ]
  }
];



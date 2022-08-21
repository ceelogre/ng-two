import {Routes} from '@angular/router';
import {LayoutComponent} from './../../shared/core-components/layout/layout.component';
import {UsersComponent} from './components/users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: UsersComponent
      },
      {
        path: '**',
        redirectTo: '/users'
      }
    ]
  }
];



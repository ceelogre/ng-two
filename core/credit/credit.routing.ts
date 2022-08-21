import {Routes} from '@angular/router';
import {LayoutComponent} from '../../shared/core-components/layout/layout.component';
import {CreditComponent} from './components/credit/credit.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CreditComponent
      },
      {
        path: '',
        redirectTo: '/credits'
      }
    ]
  }
];



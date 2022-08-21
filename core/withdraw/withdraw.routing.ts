import { Routes } from '@angular/router';
import { LayoutComponent } from './../../shared/core-components/layout/layout.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: WithdrawComponent
      },
      {
        path: '**',
        redirectTo: '/withdraws'
      }
    ]
  }
];



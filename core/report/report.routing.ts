import {ReportsComponent} from './components/reports/reports.component';
import {Routes} from '@angular/router';
import {LayoutComponent} from '../../shared/core-components/layout/layout.component';
import {ReportsLayoutComponent} from "./components/reports-layout/reports-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ReportsComponent
      }
    ]
  },
  {
    path: 'reports',
    component: ReportsLayoutComponent,
  },
  {
    path: '**',
    redirectTo: '/reports'
  }
];



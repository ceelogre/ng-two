import { Routes } from '@angular/router';
import { LayoutComponent } from '../../shared/core-components/layout/layout.component';
import { JobCreateComponent } from './components/job-create/job-create.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { RequestLayoutComponent } from './components/request-layout/request-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: JobsComponent
      }
    ]
  },
  {
    path: 'request',
    component: RequestLayoutComponent,
    children: [
      {
        path: 'create',
        component: JobCreateComponent
      },
      {
        path: ':id',
        component: JobCreateComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/inspections'
  }
];



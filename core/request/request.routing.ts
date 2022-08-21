import {RequestsComponent} from './components/requests/requests.component';
import {Routes} from '@angular/router';
import {LayoutComponent} from '../../shared/core-components/layout/layout.component';
import {RequestsLayoutComponent} from "./components/requests-layout/requests-layout.component";
import {CreateRequestComponent} from "./components/create-request/create-request.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: RequestsComponent
      }
    ]
  },
  {
    path: 'requests',
    component: RequestsLayoutComponent,
    children: [
      {
        path: 'create',
        component: CreateRequestComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/requests'
  }
];



import {Routes} from '@angular/router';
import {LayoutComponent} from '../../shared/core-components/layout/layout.component';
import {TokenComponent} from './components/token/token.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: TokenComponent
      },
      {
        path: '',
        redirectTo: '/tokens'
      }
    ]
  }
];



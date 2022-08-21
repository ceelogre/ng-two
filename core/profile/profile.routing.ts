import {LayoutComponent} from '../../shared/core-components/layout/layout.component';
import {ProfileComponent} from './components/profile/profile.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ProfileComponent
      }
    ]
  }
];



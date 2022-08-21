import {IconsModule} from './../core-components/icon/icon/icon.module';
import {DashboardService} from './provider/service/dashboard.service';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [IconsModule, CommonModule],
  exports: [DashboardComponent],
  declarations: [DashboardComponent],
  providers: [DashboardService],
})
export class DashboardComponetsModule { }

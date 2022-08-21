import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequestService } from "../request/components/provider/service/request.service";
import { ModalDialogService } from './../../provider/service/modal.service';
import { CoreComponentsModule } from './../../shared/core-components/core-components.module';
import { TransactionService } from './../credit/providers/service/credit.service';
import { ReportsLayoutComponent } from "./components/reports-layout/reports-layout.component";
import { ReportsComponent } from './components/reports/reports.component';
import { routes } from './report.routing';


@NgModule({
  declarations: [ReportsComponent, ReportsLayoutComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CoreComponentsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [TransactionService, RequestService, ModalDialogService]
})
export class ReportModule { }

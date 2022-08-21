import { TokenService } from './../token/provider/token.service';
import { PublicInterfaceComponent } from './components/public-interface/public-interface.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreComponentsModule } from './../../shared/core-components/core-components.module';
import { InspectionService } from './../job/providers/service/job.service';
import { routes } from './public.routing';
import { VerifyComponent } from './components/verify/verify.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { VerifyReportComponent } from './components/verify-report/verify-report.component';



@NgModule({
  declarations: [PublicInterfaceComponent, VerifyComponent, VerifyReportComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CoreComponentsModule,
    CommonModule,
    PdfViewerModule,
    RouterModule.forChild(routes)
  ],
  providers: [InspectionService, TokenService]
})
export class PublicModule { }

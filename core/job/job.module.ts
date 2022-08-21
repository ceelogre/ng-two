import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreComponentsModule } from '../../shared/core-components/core-components.module';
import { TransactionService } from "../credit/providers/service/credit.service";
import { RequestService } from "../request/components/provider/service/request.service";
import { httpInterceptorProviders } from './../../provider/interceptor/interceptor-providers';
import { ModalDialogService } from './../../provider/service/modal.service';
import { BuildingPipe } from './../../shared/core-components/provider/pipe/building-type.pipe';
import { ConstructionPipe } from './../../shared/core-components/provider/pipe/construction-wall.pipe';
import { LandPipe } from './../../shared/core-components/provider/pipe/land-type.pipe';
import { PropertyPipe } from './../../shared/core-components/provider/pipe/property-type.pipe';
import { ResidenceFilterPipe } from './../../shared/core-components/provider/pipe/residence-category.pipe';
import { ValuationMethodPipe } from './../../shared/core-components/provider/pipe/valuation-method.pipe';
import { ValuationPipe } from './../../shared/core-components/provider/pipe/valuation.pipe';
import { JobCreateComponent } from './components/job-create/job-create.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { RequestLayoutComponent } from './components/request-layout/request-layout.component';
import { ValuationPropertyComponent } from './components/valuation-property/valuation-property.component';
import { routes } from './job.routing';
import { DraftService } from './providers/service/draft.service';
import { InspectionService } from './providers/service/job.service';
import { ValuationDataService } from './providers/service/valuation-data.service';

const pipes = [
  ResidenceFilterPipe,
  PropertyPipe,
  ValuationPipe,
  BuildingPipe,
  LandPipe,
  ConstructionPipe,
  ValuationMethodPipe
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreComponentsModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [
    JobsComponent,
    JobCreateComponent,
    RequestLayoutComponent,
    ValuationPropertyComponent,
    pipes
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [httpInterceptorProviders, InspectionService, DraftService, RequestService, TransactionService, ValuationDataService, ModalDialogService]
})
export class JobModule { }

import { ModalDialogService } from './../../provider/service/modal.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { httpInterceptorProviders } from './../../provider/interceptor/interceptor-providers';
import { CoreComponentsModule } from './../../shared/core-components/core-components.module';
import { CreateRequestComponent } from "./components/create-request/create-request.component";
import { RequestService } from './components/provider/service/request.service';
import { RequestsLayoutComponent } from "./components/requests-layout/requests-layout.component";
import { RequestsComponent } from './components/requests/requests.component';
import { routes } from './request.routing';
import { TransactionService } from "../credit/providers/service/credit.service";
import { UserService } from "../user/providers/service/user.service";


@NgModule({
  declarations: [RequestsComponent, RequestsLayoutComponent, CreateRequestComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CoreComponentsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [httpInterceptorProviders, RequestService, UserService, TransactionService]
})
export class RequestsModule { }

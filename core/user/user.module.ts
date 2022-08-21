import { UserModalService } from './providers/service/user-modal.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { httpInterceptorProviders } from '../../provider/interceptor/interceptor-providers';
import { CoreComponentsModule } from '../../shared/core-components/core-components.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersComponent } from './components/users/users.component';
import { UserService } from './providers/service/user.service';
import { routes } from './user.routing';
import { UserMessageComponent } from './components/user-message/user-message.component';
import { RequestService } from "../request/components/provider/service/request.service";
import { TransactionService } from "../credit/providers/service/credit.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreComponentsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  exports: [
    UserMessageComponent,
    CreateUserComponent
  ],
  declarations: [
    UsersComponent,
    CreateUserComponent,
    UserMessageComponent
  ],
  providers: [UserService, UserModalService, RequestService, TransactionService, httpInterceptorProviders],
})
export class UserModule { }

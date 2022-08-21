import { AdminService } from './../../provider/service/admin.service';
import { UserModalService } from './../user/providers/service/user-modal.service';
import { UserService } from './../user/providers/service/user.service';
import { WithdrawService } from './providers/service/withdraw.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { httpInterceptorProviders } from './../../provider/interceptor/interceptor-providers';
import { CoreComponentsModule } from './../../shared/core-components/core-components.module';
import { CreateWithdrawComponent } from './components/create-withdraw/create-withdraw.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { routes } from './withdraw.routing';


@NgModule({
  declarations: [WithdrawComponent, CreateWithdrawComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CoreComponentsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [httpInterceptorProviders, WithdrawService, UserModalService]
})
export class WithDrawModule { }

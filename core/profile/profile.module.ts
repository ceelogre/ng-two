import { httpInterceptorProviders } from './../../provider/interceptor/interceptor-providers';
import { UserModule } from './../user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './profile.routing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreComponentsModule } from '../../shared/core-components/core-components.module';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { UserModalService } from "../user/providers/service/user-modal.service";
import { UserService } from "../user/providers/service/user.service";

@NgModule({
  imports: [
    CoreComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [],
  declarations: [ProfileComponent],
  providers: [UserModalService, UserService, httpInterceptorProviders],
})
export class ProfileModule { }

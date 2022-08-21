import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routes} from './auth.routing';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CoreComponentsModule} from '../../shared/core-components/core-components.module';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {LoginComponent} from './components/login/login.component';
import {NgModule} from '@angular/core';

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
  declarations: [
    LoginComponent,
    ForgetPasswordComponent
  ],
  providers: [],
})
export class AuthModule { }

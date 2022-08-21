import {TokenService} from './provider/token.service';
import {ModalDialogService} from './../../provider/service/modal.service';
import {TransactionService} from './../credit/providers/service/credit.service';
import {routes} from './token.routing';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CoreComponentsModule} from './../../shared/core-components/core-components.module';
import {TokenCardComponent} from './components/token-card/token-card.component';
import {TokenComponent} from './components/token/token.component';


@NgModule({
  declarations: [TokenComponent, TokenCardComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CoreComponentsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [TransactionService, TokenService, ModalDialogService]
})
export class TokenModule { }

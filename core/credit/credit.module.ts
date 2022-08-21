import {RequestService} from './../request/components/provider/service/request.service';
import {TransactionService} from './providers/service/credit.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalDialogService} from './../../provider/service/modal.service';
import {routes} from './credit.routing';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CoreComponentsModule} from '../../shared/core-components/core-components.module';
import {NgModule} from '@angular/core';
import {CreditComponent} from './components/credit/credit.component';
import {CreditCardComponent} from './components/credit-card/credit-card.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CoreComponentsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [CreditComponent, CreditCardComponent],
  providers: [TransactionService, ModalDialogService, RequestService],
})
export class CreditModule { }

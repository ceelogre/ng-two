import { IWithdraw } from './../../providers/model/withdraw.model';
import { WithdrawService } from './../../providers/service/withdraw.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EStatePartial } from 'src/app/provider/enum/state-partial.enum';
import { IMessage } from './../../../../provider/model/message.model';
import { IResponseObject } from './../../../../provider/model/response-object.model';
import { IUser } from './../../../../provider/model/user.model';
import { AdminService } from './../../../../provider/service/admin.service';
import { DataService } from './../../../../provider/service/data.service';
import { StateService } from './../../../../provider/service/state.service';

@Component({
  selector: 'app-create-withdraw',
  templateUrl: './create-withdraw.component.html',
  styleUrls: ['./create-withdraw.component.css']
})
export class CreateWithdrawComponent implements OnInit {
  withdrawForm: FormGroup;
  @Output() actionEvent = new EventEmitter<IMessage>();
  withdrawLoading = false;
  message: IMessage;
  error: boolean = false;
  todayDate: Date = new Date(new Date().toLocaleDateString());

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateWithdrawComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private withdrawService: WithdrawService,
    private stateService: StateService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.withdrawForm = this.fb.group({
      amountCtrl: [null, [Validators.required]],
      dateCtrl: [null, [Validators.required]],
    })
  }

  get withdrawCtrls() {
    return this.withdrawForm.controls;
  }

  get translations() {
    return this.dataService.translations
  }

  get authUser(): IUser {
    return this.stateService.authUser.data;
  }

  // create new withdrawal
  create(): void {
    if (this.withdrawForm?.valid) {
      this.withdrawLoading = true;
      const request: IWithdraw = {
        userId: this.authUser.id,
        amount: parseInt(this.noComma(this.withdrawCtrls.amountCtrl.value)),
        withdrawDate: this.withdrawCtrls.dateCtrl.value
      }
      this.withdrawService.create(request).subscribe((res: IResponseObject<any>) => {
        this.withdrawLoading = false;
        this.message = { error: !res.status, message: res.message }
        if (res.status) {
          this.actionEvent.emit(this.message);
          this.withdrawForm.reset();
          this.closeModal();
        }
      });
    } else {
      this.withdrawForm.markAsDirty();
    }
  }

  // close modal
  closeModal(): void {
    this.dialogRef.close();
  }

  // replace comma
  noComma(value: string): string {
    return value?.replace(/,/g, "");
  }

}

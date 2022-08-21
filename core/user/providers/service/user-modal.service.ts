import { CreateWithdrawComponent } from './../../../withdraw/components/create-withdraw/create-withdraw.component';
import { UserMessageComponent } from './../../components/user-message/user-message.component';
import { IUser } from './../../../../provider/model/user.model';
import { CreateUserComponent } from './../../components/create-user/create-user.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class UserModalService {
  dialogRef: any = {};
  isOpen = false;

  constructor(private dialog: MatDialog) {
  }

  // user create/edit modal
  openUserModal(user?: IUser): void {
    this.dialogRef = this.dialog.open(CreateUserComponent, {
      width: '30%',
      data: {
        user
      },
      disableClose: false
    });
    this.dialogRef.afterClosed().subscribe(() => { });
  }

  // create withdraw modal
  openWithdrawModal(): void {
    this.dialogRef = this.dialog.open(CreateWithdrawComponent, {
      width: '40%',
      data: {},
      disableClose: false
    });
    this.dialogRef.afterClosed().subscribe(() => { });
  }

  // user warning modal
  openUserMessageModal(user: IUser): void {
    this.dialogRef = this.dialog.open(UserMessageComponent, {
      width: '20%',
      data: {
        user
      },
      disableClose: false
    });
    this.dialogRef.afterClosed().subscribe(() => { });
  }

}

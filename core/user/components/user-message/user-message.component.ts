import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EStatePartial } from "../../../../provider/enum";
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { IUser } from "../../../../provider/model/user.model";
import { DataService } from "../../../../provider/service/data.service";
import { UserService } from "../../providers/service/user.service";
import { EUserStatus } from './../../../../provider/enum/user-status.emun';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements OnInit {
  @Output() actionEvent = new EventEmitter<any>();
  title: string = null
  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserMessageComponent>, private userService: UserService,
    private dataService: DataService) {
    this.title = data?.user.status === EUserStatus.ACTIVE ? 'Deactivate' : 'Reactivate';
  }

  ngOnInit(): void {
  }

  get EUserStatus() {
    return EUserStatus;
  }

  get translations() {
    return this.dataService.translations
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  changeStatus(): void {
    let user: IUser = {
      username: this.data.user.username,
      nationalId: this.data.user.nationalId
    };
    if (this.title == 'Deactivate') {
      user.status = EUserStatus.INACTIVE;
    } else {
      user.status = EUserStatus.ACTIVE;
    }

    this.loading = true;
    this.userService.updateUser(user).subscribe((response: IResponseObject<IUser>) => {
      this.loading = false;
      if (response.status) {
        this.dataService.changeMessage(EStatePartial.SELECTED_USER.toString());
        this.actionEvent.emit(true);
        this.closeModal();
      }
    })

  }

}

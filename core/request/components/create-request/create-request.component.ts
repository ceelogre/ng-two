import { IMessage } from './../../../../provider/model/message.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { IParcel } from "../../../job/providers/model/parcel.model";
import { RequestService } from "../provider/service/request.service";
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { IRequest } from "../../../job/providers/model/inspection.model";
import { DataService } from "../../../../provider/service/data.service";
import { EStatePartial } from "../../../../provider/enum";
import { StateService } from "../../../../provider/service/state.service";
import { IUser } from "../../../../provider/model/user.model";
import { UserService } from "../../../user/providers/service/user.service";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  @Output() actionEvent = new EventEmitter<IMessage>();
  parcel: IParcel = null;
  message: string = null;
  error: boolean = null;
  isFetching: boolean = false;
  userId: string = null;
  users: IUser[] = [];
  userTypes: any[] = [];


  constructor(public dialogRef: MatDialogRef<CreateRequestComponent>, private stateService: StateService,
    private requestService: RequestService, private dataService: DataService, private userService: UserService) { }

  get translations() {
    return this.dataService.translations
  }

  ngOnInit(): void {
    this.userTypes = [
      {
        'name': this.translations.valuer,
        'value': 'VALUER'
      },
      {
        'name': this.translations.bailiff,
        'value': 'BAILIFF'
      }
    ];
  }

  // close dialog modal
  closeModal(): void {
    this.dialogRef.close();
  }

  // receive parcel
  receiveParcel(event: IParcel): void {
    this.parcel = event;
  }

  get isAdmin(): boolean {
    return this.stateService.isAdmin;
  }

  displayUsers(event): void {
    this.userService.getUserByType(event).subscribe((response: IResponseObject<IUser[]>) => {
      if (response.status) {
        const { data } = response;
        data.forEach((user, index) => {
          if (event == 'BAILIFF') {
            user.displayNames = user.firstName.concat(' ').concat(user.lastName).concat('<').concat(user.nationalId).concat('>');
          } else if (event == 'VALUER') {
            user.displayNames = user.firstName.concat(' ').concat(user.lastName).concat('<').concat(user.valuerId).concat('>');;
          }
        });
        this.users = data;
      }
    })
  }

  setUserId(event): void {
    this.userId = event;
  }

  createRequest(): void {
    this.isFetching = true;
    this.requestService.create(this.parcel.id, this.userId).subscribe((response: IResponseObject<IRequest>) => {
      this.message = response.message;
      this.error = !response.status;
      this.isFetching = false;
      if (response.status) {
        this.dataService.changeMessage(EStatePartial.REQUEST.toString());
        this.closeModal();
      } else {
      }
    });
  }

}

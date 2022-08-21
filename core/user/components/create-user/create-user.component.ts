import { IMessage } from './../../../../provider/model/message.model';
import { ValidationService } from './../../../../provider/service/validation.service';
import { IResponseObject } from './../../../../provider/model/response-object.model';
import { AdminService } from './../../../../provider/service/admin.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/provider/service/data.service';
import { EGender } from './../../../../provider/enum/gender.enum';
import { EUserRole } from './../../../../provider/enum/user-role.enum';
import { IUser } from './../../../../provider/model/user.model';
import { UserService } from "../../providers/service/user.service";
import { EStatePartial } from "../../../../provider/enum";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @Output() actionEvent = new EventEmitter<IMessage>();
  userFormGroup: FormGroup;
  userLoading = false;
  message: string;
  error: boolean = false;
  todayDate: Date = new Date(new Date().toLocaleDateString());

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    private fb: FormBuilder, public dataService: DataService,
    private adminService: AdminService, private userService: UserService,
    private validation: ValidationService) { }

  ngOnInit(): void {
    this.startUP();
  }

  get userCtrls() {
    return this.userFormGroup.controls;
  }

  get translations() {
    return this.dataService.translations
  }

  startUP(): void {
    this.userFormGroup = this.fb.group({
      firstNameCtrl: new FormControl(this.data?.user?.firstName, [Validators.required]),
      lastNameCtrl: new FormControl(this.data?.user?.lastName, [Validators.required]),
      roleCtrl: new FormControl(this.data?.user?.role, [Validators.required]),
      certificationYearCtrl: new FormControl(this.data?.user?.certificationYear, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      nationalIdCtrl: new FormControl(this.data?.user?.nationalId, [Validators.required, Validators.maxLength(16)]),
      phoneNumberCtrl: new FormControl(this.data?.user?.phoneNumber, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
      dateOfBirthCtrl: new FormControl(new Date(this.data?.user?.dateOfBirth), [Validators.required]),
      emailCtrl: new FormControl(this.data?.user?.email, [Validators.required, this.validation.EMAIL]),
      usernameCtrl: new FormControl(this.data?.user?.username),
      genderCtrl: new FormControl(this.data?.user?.gender, [Validators.required])
    })
  }

  // set role
  onRoleSelect(e: EUserRole): void {
    this.userCtrls.roleCtrl.setValue(e);
  }

  // set gender
  onGenderSelect(e: EGender): void {
    this.userCtrls.genderCtrl.setValue(e);
  }

  // close dialog modal
  closeModal(): void {
    this.dialogRef.close();
  }

  // create user
  createUser(create: boolean = true): void {
    this.runValidation();
    if (this.userFormGroup?.valid) {
      this.userLoading = true;
      let user: IUser = {
        firstName: this.userCtrls.firstNameCtrl.value,
        lastName: this.userCtrls.lastNameCtrl.value,
        role: this.userCtrls.roleCtrl.value,
        certificationYear: this.userCtrls.certificationYearCtrl.value,
        nationalId: this.userCtrls.nationalIdCtrl.value,
        phoneNumber: this.userCtrls.phoneNumberCtrl.value,
        dateOfBirth: this.userCtrls.dateOfBirthCtrl.value,
        email: this.userCtrls.emailCtrl.value,
        gender: this.userCtrls.genderCtrl.value,
        ...(create && { password: this.userCtrls.nationalIdCtrl.value }),
        ...(!create && {
          id: this.data.user.id,
          status: this.data.user.status,
          username: this.data.user.username
        })
      }

      if (create) {
        this.adminService.createUser(user).subscribe((res: IResponseObject<IUser>) => {
          this.userLoading = false;
          this.message = res.message;
          if (res.status) {
            this.error = false;
            this.dataService.changeMessage(EStatePartial.USERS.toString());
          } else {
            this.error = true;
          }
        });
      } else {
        user.newUsername = this.userCtrls.usernameCtrl.value;
        this.userService.updateUser(user).subscribe((res: IResponseObject<IUser>) => {
          this.userLoading = false;
          this.message = res.message;
          if (res.status) {
            this.error = false;
            this.dataService.changeMessage(EStatePartial.USERS.toString());
            this.closeModal();
          } else {
            this.error = true;
          }

        });
      }
    }
  }

  // run manual validation
  runValidation(): void {
    Object.keys(this.userCtrls).forEach(ctrl => {
      if (this.userCtrls[ctrl].errors) {
        this.userFormGroup?.controls[ctrl].markAsDirty();
      }
    });
  }

}

import { imageUrl } from './../../../../provider/util/base64-decoder.util';
import { EGender } from './../../../../provider/enum/gender.enum';
import { IAttachment } from './../../../job/providers/model/attachment.model';
import { ValidationService } from './../../../../provider/service/validation.service';
import { IMessage } from './../../../../provider/model/message.model';
import { UserService } from './../../../user/providers/service/user.service';
import { IPasswordRequest } from './../../../../provider/model/user.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IUser } from '../../../../provider/model/user.model';
import { StateService } from './../../../../provider/service/state.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModalService } from "../../../user/providers/service/user-modal.service";
import { Subscription } from "rxjs";
import { EStatePartial } from "../../../../provider/enum";
import { DataService } from "../../../../provider/service/data.service";
import { IResponseObject } from "../../../../provider/model/response-object.model";
import { AuthService } from "../../../../provider/service/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  editInfo = false;
  photoEdit = false;
  authFormGroup: FormGroup;
  userFormGroup: FormGroup;
  passwordLoading = false;
  userLoading = false;
  message: IMessage[] = [];
  subscription: Subscription;
  image: IAttachment;
  todayDate = new Date()

  constructor(private stateService: StateService, private userModalService: UserModalService, private validation: ValidationService,
    private userService: UserService, public dataService: DataService, private authService: AuthService, private fb: FormBuilder) { }

  get authUser(): IUser {
    return this.stateService.state.authUser.data;
  }

  get isValuer(): boolean {
    return this.stateService.isValuer;
  }

  get authControls() {
    return this.authFormGroup.controls;
  }

  get userCtrls() {
    return this.userFormGroup.controls;
  }

  get profilePicture(): string {
    return this.stateService.profilePicture;
  }

  get translations() {
    return this.dataService.translations
  }

  // toggle create/edit user modal
  toggleUser(): void {
    this.userModalService.openUserModal(this.authUser);
  }

  ngOnInit(): void {
    this.initUserForm();
    this.initAuthForm();
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      if (message == EStatePartial.SELECTED_USER.toString()) {
        this.getUserProfile();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // get user profile
  getUserProfile(): void {
    const mutation = EStatePartial.AUTH_USER;
    this.authService.getUserById().subscribe((res: IResponseObject<any>) => {
      if (res.status) {
        const { data } = res;
        this.stateService.setState(mutation, { isLoading: false, data });
      }
    });
  }

  // set gender
  onGenderSelect(e: EGender): void {
    this.userCtrls.genderCtrl.setValue(e);
  }

  // init user passwrod form
  initAuthForm(): void {
    this.authFormGroup = this.fb.group({
      oldPasswordControl: new FormControl(null, [Validators.required]),
      newPasswordControl: new FormControl(null, [Validators.required, this.validation.validPwd])
    });
  }

  //  init user form
  initUserForm(): void {
    this.userFormGroup = this.fb.group({
      nationalIdCtrl: new FormControl(this.authUser?.nationalId, [Validators.required, Validators.maxLength(16)]),
      dateOfBirthCtrl: new FormControl(new Date(this.authUser?.dateOfBirth), [Validators.required]),
      emailCtrl: new FormControl(this.authUser?.email, [Validators.required, this.validation.EMAIL]),
      genderCtrl: new FormControl(this.authUser.gender, [Validators.required])
    })
  }

  // change password
  changePassword(): void {
    this.passwordLoading = true;
    const request: IPasswordRequest = {
      userId: this.authUser.id,
      oldPassword: this.authControls.oldPasswordControl.value,
      password: this.authControls.newPasswordControl.value
    };
    this.userService.updatePassword(request).subscribe((res: IResponseObject<any>) => {
      this.passwordLoading = false;
      this.message[1] = { error: !res.status, message: res.message };
      if (res.status) {
        this.authFormGroup.reset();
      }
    });
  }

  // update user
  updateUser(isUser = true): void {
    this.runValidation();
    if (this.userFormGroup?.valid) {
      this.userLoading = true;
      const { id, status, username, firstName, lastName,
        certificationYear, role, nationalId, phoneNumber,
        dateOfBirth, email, gender, photo } = this.authUser
      let request: IUser = {
        id,
        status,
        username,
        firstName,
        lastName,
        role,
        certificationYear,
        phoneNumber,
        nationalId: isUser ? this.userCtrls.nationalIdCtrl.value : nationalId,
        dateOfBirth: isUser ? this.userCtrls.dateOfBirthCtrl.value : dateOfBirth,
        email: isUser ? this.userCtrls.emailCtrl.value : email,
        gender: isUser ? this.userCtrls.genderCtrl.value : gender,
        photo: isUser ? photo : this.image.base64StringAttachment
      }
      this.userService.updateUser(request).subscribe((res: IResponseObject<IUser>) => {
        this.userLoading = false;
        this.message[0] = { error: !res.status, message: res.message };
        if (res.status) {
          const mutation = EStatePartial.AUTH_USER;
          const { data } = res;
          this.stateService.setState(mutation, { isLoading: false, data });
          if (isUser) {
            this.userFormGroup.reset();
            this.editInfo = false;
          } else {
            this.image = null;
            this.photoEdit = false;
          }
        }

      });
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

  // handle file input
  handleFileInput(files: FileList): void {
    const file = files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = () => {
        this.image = {
          extension: file.type.split("/")[1],
          fileName: file.name,
          filenameWithExtension: file.name,
          base64StringAttachment: btoa(fileReader.result.toString()),
        };
      }
    }
  }

  // get image from byte
  imageUrl(base64: string): string {
    return imageUrl(base64);
  }
}

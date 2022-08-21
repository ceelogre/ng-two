import { Component, ElementRef, HostListener, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IResponseObject } from './../../../../provider/model/response-object.model';
import { AuthService } from './../../../../provider/service/auth.service';
import { DataService } from './../../../../provider/service/data.service';
import { navigationHandler } from './../../../../provider/util/navigate.utli';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChildren('auth') authCard: ElementRef;
  isInputFocus = EAuthInputFocused.OUT;
  resetLoading = false;
  route$: Observable<any>;
  routeEvent: any;
  message = null; // will be used in case of failure
  codeSubmitted = false;
  error = false;
  public authFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.startUP();
    this.initAuthFormGroup();
  }

  get EAuthInputFocused() {
    return EAuthInputFocused;
  }

  get translations() {
    return this.dataService.translations
  }

  @HostListener('document:click', ['$event']) clickedOut(e: MouseEvent) {
    this.handleFocus(e);
  }

  // send code
  sendCode(): void {
    this.message = null;
    this.authFormGroup.markAsDirty();
    if (this.authFormGroup?.valid) {
      const username = this.authFormGroup.controls.usernameCtrl.value
      this.resetLoading = true;
      this.authService.sendCode(username).subscribe((res: IResponseObject<any>) => {
        this.resetLoading = false;
        if (res.status) {
          this.message = this.translations.verification_code_sent;
          this.error = false;
          this.codeSubmitted = true;
        } else {
          this.codeSubmitted = false;
          this.message = res.message;
          this.error = true;
        }
      });
    }
  }


  // reset pwd
  resetPassword(): void {
    this.message = null;
    this.authFormGroup.markAsDirty();
    if (this.authFormGroup?.valid) {
      const username = this.authFormGroup.controls.usernameCtrl.value
      const code = this.authFormGroup.controls.codeCtrl.value
      this.resetLoading = true;
      this.authService.resetPwd(username, code).subscribe((res: IResponseObject<any>) => {
        this.resetLoading = false;
        this.message = res.message;
        if (res.status) {
          this.authFormGroup.reset();
          this.message = this.translations.password_resetted;
          this.error = false;
        } else {
          this.message = res.message;
          this.error = true;
        }
      });
    }
  }

  initPwdControls(): void {
    this.authFormGroup.controls.usernameCtrl.setValidators(null);
    this.authFormGroup.controls.codeCtrl.setValidators([Validators.required]);
  }


  // start up
  startUP(): void {
    if (this.dataService.isAuthenticated()) {
      this.router.navigateByUrl(navigationHandler(this.dataService.getRole()));
    }
  }

  // init authFormGroup
  initAuthFormGroup(): void {
    this.authFormGroup = this.formBuilder.group({
      usernameCtrl: [null, [Validators.required]],
      codeCtrl: [null]
    });
  }

  // handle auth input parent focus
  Focus(e: boolean): void {
    this.isInputFocus = e ? EAuthInputFocused.USR : EAuthInputFocused.PWD;
  }

  // Handle focus out of auth card
  handleFocus(e: MouseEvent): void {
    if (event.target['type'] !== 'text'
      && event.target['type'] !== 'password') {
      this.isInputFocus = EAuthInputFocused.OUT;
    }
  }

}

enum EAuthInputFocused {
  USR = 'USR',
  PWD = 'PWD',
  OUT = 'OUT'
}


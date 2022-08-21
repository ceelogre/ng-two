import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { navigationHandler } from './../../../../provider/util/navigate.utli';
import { Component, ElementRef, HostListener, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EStatePartial } from './../../../../provider/enum/state-partial.enum';
import { IResponseObject } from './../../../../provider/model/response-object.model';
import { AuthService } from './../../../../provider/service/auth.service';
import { DataService, EStorageFields } from './../../../../provider/service/data.service';
import { StateService } from './../../../../provider/service/state.service';
import { ILoginRequest } from './../provider/model/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChildren('auth') authCard: ElementRef;
  isInputFocus = EAuthInputFocused.OUT;
  loginLoading = false;
  route$: Observable<any>;
  routeEvent: any;
  message = null; // will be used in case of failure
  public authFormGroup: FormGroup;

  constructor(
    private stateService: StateService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.startUP();
    this.initAuthFormGroup();
    this.handleHttpEvent();
  }

  get EAuthInputFocused() {
    return EAuthInputFocused;
  }

  get translations() {
    return this.dataService.translations
  }

  get selectedLanguage() {
    return this.dataService.getCurrentLanguage();
  }

  get languages() {
    return this.dataService.languages.filter(l => l.value !== this.selectedLanguage?.value)
  }

  @HostListener('document:click', ['$event']) clickedOut(e: MouseEvent) {
    this.handleFocus(e);
  }


  // login [mock]
  login(): void {
    this.message = null;
    this.authFormGroup.markAsDirty();
    if (!this.dataService.localStorageFind() && this.authFormGroup?.valid) {
      const request: ILoginRequest = {
        username: this.authFormGroup.controls.usernameCtrl.value,
        password: this.authFormGroup.controls.passwordCtrl.value
      }
      this.loginLoading = true;
      this.authService.login(request).subscribe((res: IResponseObject<any>) => {
        if (res.status) {
          this.dataService.changeMessage(EStatePartial.STATISTICS.toString());
          const { user, token } = res.data;
          this.dataService.localStorageSet(EStorageFields.USER_ID, user.id);
          this.dataService.localStorageSet(EStorageFields.TOKEN, token);
          this.getUserProfile();
        } else {
          this.loginLoading = false;
          this.message = res.message;
        }
      });
    }
  }

  // get user profile
  getUserProfile(): void {
    const mutation = EStatePartial.AUTH_USER;
    this.authService.getUserById().subscribe((res: IResponseObject<any>) => {
      this.loginLoading = false;
      if (res.status) {
        const { data } = res;
        this.stateService.setState(mutation, { isLoading: false, data });
        this.router.navigateByUrl(navigationHandler(data.role));
      } else {
        this.message = res.message;
      }
    });
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
      usernameCtrl: new FormControl(null, [Validators.required]),
      passwordCtrl: new FormControl(null, [Validators.required])
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

  // handle http interceptors events
  handleHttpEvent(): void {
    this.route$ = this.route.paramMap.pipe(map(() => window.history.state));
    this.routeEvent = this.route$.subscribe(data => {
      if (data) {
        this.message = data.message;
        this.authFormGroup.controls.usernameCtrl.setValue(data.username);
      }
    })
  }

  // set language
  setLanguage(e: any): void {
    this.dataService.localStorageSet(EStorageFields.LANGUAGE, e.value);
    window.location.reload();
  }

}

enum EAuthInputFocused {
  USR = 'USR',
  PWD = 'PWD',
  OUT = 'OUT'
}

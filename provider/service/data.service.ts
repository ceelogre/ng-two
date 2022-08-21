import { ELanguage } from './../enum/language.enum';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { BehaviorSubject } from "rxjs";
import { EfilterType } from './../enum/filter-type.enum';
import { EApplicationState, EGender } from './../enum/gender.enum';
import { EInspectionStatus } from './../enum/inspection-status.enum';
import { EUserRole } from './../enum/user-role.enum';
import { EUserStatus } from './../enum/user-status.emun';
import { IGenValue } from './../model/status.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  errorMessage: string = null;
  currentComponent: number = null;
  translations: any = null;
  userStatus = null;
  applicationState = null;
  inspectiondStatus = null;
  requestStatus = null
  userRole = null;
  userGender = null;
  languages = null;
  sideBarOpen = false;
  platform = null;

  constructor() { }

  initData(): void {
    this.languages = [
      {
        name: 'Kinyarwanda',
        value: ELanguage.RW
      },
      {
        name: 'English',
        value: ELanguage.EN
      },
      {
        name: 'Francais',
        value: ELanguage.FR
      }
    ]
    this.userStatus = [
      {
        name: this.translations[EUserStatus.ACTIVE],
        value: EUserStatus.ACTIVE
      },
      {
        name: this.translations[EUserStatus.INACTIVE],
        value: EUserStatus.INACTIVE
      }
    ];

    this.applicationState = [
      {
        name: this.translations[EApplicationState.NEW],
        value: EApplicationState.NEW
      },
      {
        name: this.translations[EApplicationState.PENDING],
        value: EApplicationState.PENDING
      },
      {
        name: this.translations[EApplicationState.CLOSED],
        value: EApplicationState.CLOSED
      },
      {
        name: this.translations[EApplicationState.STARTED],
        value: EApplicationState.STARTED
      },
    ];

    this.inspectiondStatus = [
      {
        name: this.translations[EInspectionStatus.COMPLETED],
        value: EInspectionStatus.COMPLETED
      },
      {
        name: this.translations[EInspectionStatus.APPROVED],
        value: EInspectionStatus.APPROVED
      },
      {
        name: this.translations[EInspectionStatus.NEW],
        value: EInspectionStatus.NEW
      },
      {
        name: this.translations[EInspectionStatus.PENDING],
        value: EInspectionStatus.PENDING
      },
      {
        name: this.translations[EInspectionStatus.SUCCESSFUL],
        value: EInspectionStatus.SUCCESSFUL
      },
      {
        name: this.translations[EInspectionStatus.FAILED],
        value: EInspectionStatus.FAILED
      }
    ];

    this.requestStatus = [
      {
        name: this.translations[EInspectionStatus.COMPLETED],
        value: EInspectionStatus.COMPLETED
      },
      {
        name: this.translations[EInspectionStatus.APPROVED],
        value: EInspectionStatus.APPROVED
      },
      {
        name: this.translations[EInspectionStatus.PENDING],
        value: EInspectionStatus.PENDING
      }
    ];


    this.userRole = [
      {
        name: this.translations[EUserRole.VALUER],
        value: EUserRole.VALUER
      },
      {
        name: this.translations[EUserRole.BAILIFF],
        value: EUserRole.BAILIFF
      },
      {
        name: this.translations[EUserRole.ADMIN],
        value: EUserRole.ADMIN
      },
    ];

    this.userGender = [
      {
        name: this.translations[EGender.MALE],
        value: EGender.MALE
      },
      {
        name: this.translations[EGender.FEMALE],
        value: EGender.FEMALE
      }
    ]
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  // store in local storage [default user id]
  localStorageSet(key: string = EStorageFields.USER_ID, value: string): void {
    localStorage.setItem(key, value);
  }

  // retrieve item in local storage [default user id]
  localStorageFind(e: string = EStorageFields.USER_ID): string {
    return localStorage.getItem(e);
  }

  // clear local storage
  localStorageClear(e: string): void {
    localStorage.removeItem(e);
  }

  // check if is authenticated
  isAuthenticated(): boolean {
    return !!(this.localStorageFind() && this.localStorageFind(EStorageFields.TOKEN))
  }

  // clear all local in storage
  clearAll(): void {
    this.localStorageClear(EStorageFields.USER_ID);
    this.localStorageClear(EStorageFields.TOKEN);
  }

  // get logged user role
  getRole(): EUserRole {
    return this.decode('role');
  }

  // get username
  getUsername(): EUserRole {
    return this.decode('sub');
  }

  // decode anything from token
  decode(key: string): any {
    try {
      return JSON.parse(JSON.stringify(jwt_decode(this.localStorageFind(EStorageFields.TOKEN))))[key];
    } catch (ex: any) {
      return null;
    }
  }

  // get current language
  getCurrentLanguage() {
    return this.languages.find(l => this.localStorageFind(EStorageFields.LANGUAGE) === l.value);
  }

  // get statuses by type
  getStatusByType(e: EfilterType): IGenValue<EUserStatus | EInspectionStatus | EApplicationState>[] {
    switch (e) {
      case EfilterType.INSPECTION_STATUS:
      case EfilterType.CREDIT_STATUS:
        return this.inspectiondStatus;
      case EfilterType.REQUEST_STATUS:
        return this.requestStatus;
      case EfilterType.APPLICATION_STATE:
        return this.applicationState;
      default:
        return this.userStatus;
    }
  }

  // fetch translations
  async getTranslations(): Promise<any> {
    return await this.LoadTranslations();
  }

  // load translations
  LoadTranslations(): Promise<any> {
    try {
      let language = this.localStorageFind(EStorageFields.LANGUAGE);
      return new Promise((resolve) => {
        if (language) {
          import(`../../../assets/languages/${language}.json`).then((translations: any) => {
            this.translations = translations;
            this.initData();
            resolve(translations);
          });
        }
      })
    } catch (ex: any) {
      throw (ex);
    }
  }

  // set current component
  setCurrentComponent(num: number): void {
    this.currentComponent = num;
  }

  // set error message
  setCurrentMessage(msg: string): void {
    this.errorMessage = msg;
  }

  // toggle side menu
  toggleSideMenu(isOpen: boolean): void {
    this.sideBarOpen = isOpen;
  }

}

export enum EStorageFields {
  USER_ID = 'uuid_',
  TOKEN = 't__',
  ROLE = 'r__',
  LANGUAGE = 'l__'
}

import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  notifyRunValidation = new Subject<boolean>();

  constructor() { }

  // re-usable UPI validation
  UPI(control: AbstractControl): ValidationErrors | null {
    if (control.value !== null) {
      const res = control.value.match(/^[0-9]\/[0-9]{2}\/[0-9]{2}\/[0-9]{2}\/[-0-9]{1,9}$/)
      if (res === null) {
        return { upi: true };
      }
      return null;
    }
  }

  // Re-usable custom reactive form email pattern validator [accurate than [validators.email]]
  EMAIL(control: AbstractControl): ValidationErrors | null {
    if (control.value !== null) {
      const res = control.value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
      if (res === null) {
        return { email: true };
      }
      return null;
    }
  };

  // password validation
  validPwd(control: AbstractControl): ValidationErrors | null {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@?#$%^&*])(?=.{8,})');
    if (!strongRegex.test(control.value)) {
      return { password: true };
    }
    return null
  }

  // password validation
  rangeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = parseInt(control?.value?.toString().replace(/,/g, ""));
      if (min > value) {
        return {
          min: {
            actualMin: value,
            requiredMin: min
          }
        };
      }
      if (max < value) {
        return {
          max: {
            actualMax: value,
            requiredMax: max
          }
        };
      }
      return null;
    }
  }

  // is longitude
  isLongitude(control: AbstractControl): ValidationErrors | null {
    const long = control.value;
    if (!(isFinite(long) && Math.abs(long) <= 180)) {
      return { longitude: true };
    }
    return null
  }

  // is latitude
  isLatitude(control: AbstractControl): ValidationErrors | null {
    const lat = control.value;
    if (!(isFinite(lat) && Math.abs(lat) <= 90)) {
      return { latitude: true };
    }
    return null
  }

  // notify child component to run validations
  notifyChildComponents() {
    this.notifyRunValidation.next(true);
  }

}



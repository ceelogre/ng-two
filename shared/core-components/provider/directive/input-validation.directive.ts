import {FormControl} from '@angular/forms';
import {Directive, HostBinding, Input} from '@angular/core';

@Directive({ selector: '[validate]' })
export class InputValidation {
  private validate: FormControl;
  constructor() { }

  get isInvalid() {
    return this.validate?.dirty && this.validate?.invalid
  }

  // add is-invalid class on an input failing validation
  @HostBinding('class.is-invalid')
  get onInput(): boolean {
    return this.isInvalid;
  }

  //  setter for ctrl state
  @Input('validate')
  set control(value: FormControl) {
    if (value !== this.validate) {
      this.validate = value;
    }
  }

}

import { DataService } from './../../../../provider/service/data.service';
import { ValidationService } from './../../../../provider/service/validation.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { IGenValueData } from './../../../../provider/model/status.model';
import { EValuationProperty } from './../../providers/enum/valuation-property.enum';

@Component({
  selector: 'app-valuation-property',
  templateUrl: './valuation-property.component.html',
  styleUrls: ['./valuation-property.component.css']
})
export class ValuationPropertyComponent implements OnInit, OnChanges {
  @Output() onChangeEvent = new EventEmitter<{ type: EValuationProperty, value: string }>();
  @Input() data: IGenValueData<EValuationProperty, boolean>;
  @Input() preview = false;
  @Input() value: string = null
  propertyForm: FormGroup;
  checked: boolean = false;

  constructor(private fb: FormBuilder, private validationService: ValidationService, private dataService: DataService) { }

  get translations() {
    return this.dataService.translations
  }

  ngOnInit(): void {
    this.startUP();
  }

  // track changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.data) {
      this.data = changes.data.currentValue;
    }
    if (changes?.preview) {
      this.preview = changes.preview.currentValue;
    }
    if (changes?.value) {
      this.value = changes.value.currentValue;
    }
  }

  // init component
  startUP(): void {
    this.propertyForm
      = this.fb.group({
        propCtrl: [null]
      });
    this.disableControl(!this.checked);
    this.emit();
    this.propertyForm.controls.propCtrl.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      this.emit(val);
    });
    this.listenOnValidationEvent();
    this.setInput();
  }

  // on check
  onCheck(): void {
    this.checked = !this.checked;
    this.disableControl(!this.checked);
    if (this.data?.type) {
      this.propertyForm.controls.propCtrl.setValue(this.checked ? this.translations.yes : this.translations.no)
    }
    this.emit();
  }

  // emit changes
  emit(val = null) {
    const { value: _v } = this.data;
    if (this.data.type) {
      this.onChangeEvent.emit({ type: _v, value: this.checked ? this.translations.yes : this.translations.no })
    } else {
      this.onChangeEvent.emit({ type: _v, value: this.checked ? val || null : '' });
    }
  }

  // disable control
  disableControl(bool: boolean): void {
    if (bool) {
      this.propertyForm.controls.propCtrl.disable();
      this.propertyForm.controls.propCtrl.setValidators(null);
    } else {
      this.propertyForm.controls.propCtrl.setValidators([Validators.required]);
      if (this.data.type) return;
      this.propertyForm.controls.propCtrl.enable();
    }
  }

  // listen on form validation notification
  listenOnValidationEvent(): void {
    this.validationService.notifyRunValidation.subscribe((val) => {
      this.propertyForm.controls.propCtrl.markAsDirty();
    });
  }

  // set input on not preview
  setInput(): void {
    if (!this.preview && this.value) {
      this.propertyForm.controls.propCtrl.setValue(this.value);
      this.checked = true;
      this.disableControl(false);
    }
  }

}

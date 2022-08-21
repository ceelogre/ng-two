import { DataService } from './../../../provider/service/data.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { IDateFilter } from './../../../provider/model/request-filter.model';

@Component({
  selector: 'app-date-popup',
  templateUrl: './date-popup.component.html',
  styleUrls: ['./date-popup.component.css']
})
export class DatePopupComponent implements OnInit {
  @Output() onEmit = new EventEmitter<IDateFilter>();
  selectFormGroup: FormGroup;
  todayDate: Date = new Date(new Date().toLocaleDateString());

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DatePopupComponent>, private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.onDateChange();
    this.presetDate();
  }

  get startDate() {
    return new Date(this.selectFormGroup.controls.startDateCtrl.value);
  }

  get endDate() {
    if (this.selectFormGroup.controls.endDateCtrl.value)
      return new Date(this.selectFormGroup.controls.endDateCtrl.value);
    else
      return new Date(new Date().toLocaleDateString());
  }

  get translations() {
    return this.dataService.translations
  }

  initializeForm(): void {
    this.selectFormGroup = this.fb.group({
      startDateCtrl: new FormControl(null, [Validators.required]),
      endDateCtrl: new FormControl(null, [Validators.required])
    });
  }

  onDateChange(): void {
    this.selectFormGroup.valueChanges.pipe(debounceTime(100)).subscribe(val => {
      if (this.selectFormGroup?.valid && this.selectFormGroup?.dirty) {
        this.emit();
      }
    })

  }

  // emit dates on valid form
  emit(): void {
    const dates: IDateFilter = {
      endDate: this.selectFormGroup.controls.endDateCtrl.value,
      startDate: this.selectFormGroup.controls.startDateCtrl.value
    };
    this.onEmit.emit(dates)
    this.closeModal();
  }

  // preset dates
  presetDate(): void {
    const end = this.data?.endDate;
    const start = this.data?.startDate;
    if (end) {
      this.selectFormGroup.controls.endDateCtrl.setValue(end)
    }
    if (start) {
      this.selectFormGroup.controls.startDateCtrl.setValue(start)
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}

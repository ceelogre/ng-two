import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'irpv-search',
  templateUrl: './irpv-search.component.html',
  styleUrls: ['./irpv-search.component.css']
})
export class IrpvSearchComponent implements OnInit {
  inputFormGroup: FormGroup;
  @Input() label = 'Search'
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() className = ''
  @Input() debounceTime = 0;
  @Output() onChange = new EventEmitter<string>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inputFormGroup = this.fb.group({
      inputCtrl: new FormControl(null)
    })
    this.inputFormGroup?.controls?.inputCtrl.valueChanges.pipe(debounceTime(this.debounceTime)).subscribe(val => {
      this.onChange.emit(val);
    });
  }

  // track changes in props
  ngOnChanges(simpleChange: SimpleChanges): void {
    if (simpleChange?.label) {
      this.label = simpleChange?.label.currentValue;
    }
    if (simpleChange?.iconPosition) {
      this.iconPosition = simpleChange?.iconPosition.currentValue;
    }
    if (simpleChange?.debounceTime) {
      this.debounceTime = simpleChange?.debounceTime.currentValue;
    }

  }


}

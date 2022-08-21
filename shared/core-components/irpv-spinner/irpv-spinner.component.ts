import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'irpv-spinner',
  templateUrl: './irpv-spinner.component.html',
  styleUrls: ['./irpv-spinner.component.css']
})
export class IrpvSpinnerComponent implements OnInit, OnChanges {
  @Input() default: boolean = true; // black color [mainly used on white background]
  @Input() large: boolean = false; // mainly used alone

  constructor() { }

  ngOnInit(): void {
  }

  // track changes in props
  ngOnChanges(simpleChange: SimpleChanges): void {
    if (simpleChange?.default) {
      this.default = simpleChange?.default.currentValue;
    }
    if (simpleChange?.large) {
      this.large = simpleChange?.large.currentValue;
    }
  }

}

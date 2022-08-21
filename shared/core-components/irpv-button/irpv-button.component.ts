import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'irpv-button',
  templateUrl: './irpv-button.component.html',
  styleUrls: ['./irpv-button.component.css']
})
export class IrpvButtonComponent implements OnInit, OnChanges {
  @Input() iconName = null;
  @Input() label: string = null;
  @Input() className: string = 'btn btn-primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // track changes in props
  ngOnChanges(simpleChange: SimpleChanges): void {
    if (simpleChange?.iconName) {
      this.iconName = simpleChange?.iconName.currentValue;
    }
    if (simpleChange?.label) {
      this.label = simpleChange?.label.currentValue;
    }
    if (simpleChange?.className) {
      this.className = simpleChange?.className.currentValue;
    }
    if (simpleChange?.disabled) {
      this.disabled = simpleChange?.disabled.currentValue;
    }
    if (simpleChange?.loading) {
      this.loading = simpleChange?.loading.currentValue;
    }
  }

  // emit click event
  emitClickEvent(): void {
    this.onClick.next();
  }

}

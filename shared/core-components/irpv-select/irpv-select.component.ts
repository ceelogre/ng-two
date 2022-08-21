import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'irpv-select',
  templateUrl: './irpv-select.component.html',
  styleUrls: ['./irpv-select.component.css']
})
export class IrpvSelectComponent implements OnInit, OnChanges {
  @ViewChild('selectpl') public select: NgSelectComponent;
  @Input() data: any[];
  @Input() label: string = null;
  @Input() value: any = null;
  @Input() selected: any = null;
  @Input() placeholder: any = null;
  @Input() isInvalid = false;
  @Input() isFilter = true;
  @Input() multiple = false;
  @Output() onSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if (this.select && !this.isFilter) {
      this.select.close();
    }
  }

  // track changes in props
  ngOnChanges(simpleChange: SimpleChanges): void {
    if (simpleChange?.data) {
      this.data = simpleChange?.data.currentValue;
    }
    if (simpleChange?.label) {
      this.label = simpleChange?.label.currentValue;
    }
    if (simpleChange?.value) {
      this.value = simpleChange?.value.currentValue;
    }
    if (simpleChange?.selected) {
      this.selected = simpleChange?.selected.currentValue;
    }
    if (simpleChange?.isInvalid) {
      this.isInvalid = simpleChange?.isInvalid.currentValue;
    }
    if (simpleChange?.placeholder) {
      this.placeholder = simpleChange?.placeholder.currentValue;
    }
    if (simpleChange?.multiple) {
      this.multiple = simpleChange?.multiple.currentValue;
    }
  }

  // emit on is filter
  emitIsFilter(e: any): void {
    this.onSelected.emit(e);
  }

  // emit on select
  emitSelected(e: any): void {
    this.onSelected.emit(e.value ?? e);
  }


  // emit on select
  emitMultiSelected(e: any[]): void {
    this.onSelected.emit(e.map(({ value }) => value));
  }


}

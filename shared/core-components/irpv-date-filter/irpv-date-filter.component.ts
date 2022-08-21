import { DataService } from './../../../provider/service/data.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IDateFilter } from "../../../provider/model/request-filter.model";
import { ModalDialogService } from './../../../provider/service/modal.service';

@Component({
  selector: 'irpv-date-filter',
  templateUrl: './irpv-date-filter.component.html',
  styleUrls: ['./irpv-date-filter.component.css']
})
export class IrpvDateFilterComponent implements OnInit, OnChanges {
  @Input() endDate: string = null;
  @Input() startDate: string = null;
  @Input() label: string = 'Filter';
  @Input() canRefresh = true;
  @Input() isDisabled = false;
  @Output() onSubmit = new EventEmitter<IDateFilter>();
  @Output() onRefresh = new EventEmitter<any>();

  constructor(private modalService: ModalDialogService, private dataService: DataService) { }

  ngOnInit(): void {

  }

  get translations() {
    return this.dataService.translations
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges?.endDate) {
      this.endDate = simpleChanges?.endDate.currentValue;
    }

    if (simpleChanges?.startDate) {
      this.startDate = simpleChanges?.startDate.currentValue;
    }

    if (simpleChanges?.canRefresh) {
      this.canRefresh = simpleChanges?.canRefresh.currentValue;
    }
    if (simpleChanges?.isDisabled) {
      this.isDisabled = simpleChanges?.isDisabled.currentValue;
    }
  }

  // open date filter dialog
  openDateDialog(): void {
    if (this.isDisabled) {
      return;
    }
    this.modalService.openDateDialog(this.startDate, this.endDate);
    this.modalService.dialogRef.componentInstance.onEmit.subscribe((res: IDateFilter) => {
      this.startDate = res.startDate;
      this.endDate = res.endDate;
      this.onSubmit.emit(res);
    });
  }

  // on refresh
  refresh(): void {
    this.startDate = null;
    this.endDate = null;
    this.onRefresh.emit();
  }

}

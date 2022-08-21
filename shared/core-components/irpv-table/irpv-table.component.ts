import { EInspectionStatus } from './../../../provider/enum/inspection-status.enum';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EfilterType } from './../../../provider/enum';
import { EUserStatus } from './../../../provider/enum/user-status.emun';
import { IDataSourceConfig } from './../../../provider/model/table.model';

@Component({
  selector: 'irpv-table',
  templateUrl: './irpv-table.component.html',
  styleUrls: ['./irpv-table.component.css']
})
export class IrpvTableComponent implements OnInit, OnChanges {
  @Output() onSelected = new EventEmitter<any>();
  @Output() onRefreshEvent = new EventEmitter<any>();
  @Output() notFoundEvent = new EventEmitter<any>();
  @Output() onClickEvent = new EventEmitter<any>();
  @Output() onError = new EventEmitter<EfilterType>();
  @Input() statusFilter: EInspectionStatus | EUserStatus;
  @Input() tableFilter: string = null;
  @Input() loading: boolean = false;
  @Input() notFoundHidden: boolean = false;
  @Input() isFiltering = false;
  @Input() stringFilter: string = null;
  @Input() dataSource: IDataSourceConfig = {
    hasAction: false,
    fields: [],
    data: [],
    filteredData: [],
    page: 0,
    filterType: undefined
  };
  selectedIndex: number;


  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  get EfilterType() {
    return EfilterType
  }


  // track changes in props
  ngOnChanges(simpleChange: SimpleChanges): void {
    if (simpleChange?.dataSource) {
      this.dataSource = simpleChange?.dataSource.currentValue;
      this.initData();
    }
    if (simpleChange?.statusFilter) {
      this.statusFilter = simpleChange?.statusFilter.currentValue;
      this.statusFilterFunc();
    }
    if (simpleChange?.tableFilter) {
      this.tableFilter = simpleChange?.tableFilter.currentValue;
    }
    if (simpleChange?.loading) {
      this.loading = simpleChange?.loading.currentValue;
    }
    if (simpleChange?.isFiltering) {
      this.isFiltering = simpleChange?.isFiltering.currentValue;
    }
    if (simpleChange?.stringFilter) {
      this.stringFilter = simpleChange?.stringFilter.currentValue;
      this.stringFilterFunc();
    }
  }

  // init Data
  initData(): void {
    if (this.dataSource?.data) {
      this.dataSource.filteredData = this.dataSource?.data;
    }
  }

  // function that filter by status
  statusFilterFunc(): void {
    const _toFilter = this.dataSource.data;
    _toFilter.filter(_i => _i?.status === this.statusFilter);
  }

  // get select checkbox
  onSelect(e: any, index: number): void {
    this.selectedIndex = index;
    this.onSelected.emit(e);
  }

  error(event: EfilterType): void {
    this.onError.emit(event);
  }

  // emit on not found event
  emitToParent(e: boolean): void {
    if (!this.isFiltering) {
      this.notFoundEvent.next();
    } else {
      this.onRefreshEvent.next();
    }
  }

  onClick(e: any): void {
    if (this.dataSource?.hasAction) {
      this.onClickEvent.emit(e);
    }
  }

  stringFilterFunc(): void {
    if (this.stringFilter && this.dataSource?.filteredData) {
      this.dataSource.filteredData = this.dataSource.data.filter((item) => {
        return this.dataSource.fields.some(({ key }) => item[key].toLowerCase().includes(this.stringFilter))
      });
    }
  }

}


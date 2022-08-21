import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'irpv-paginator',
  templateUrl: './irpv-paginator.component.html',
  styleUrls: ['./irpv-paginator.component.css']
})
export class IrpvPaginatorComponent implements OnInit, OnChanges {
  config = 4; // default pages
  length = 10; //default page size
  pageList = [];
  @Input() currentPage = 1;
  @Input() dataSourceLength = 0;
  @Output() onPageSelect = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.initPageList();
  }

  // track changes in props
  ngOnChanges(simpleChange: SimpleChanges): void {
    if (simpleChange?.currentPage) {
      this.currentPage = simpleChange?.currentPage.currentValue;
    }
    if (simpleChange?.dataSourceLength) {
      this.dataSourceLength = simpleChange?.dataSourceLength.currentValue;
      this.initPageList();
    }

  }

  emitEvent(num: number): void {
    this.currentPage = num;
    this.onPageSelect.emit(num);
  }

  get showPaginator(): boolean {
    return this.dataSourceLength == this.length || this.currentPage > 1;
  }

  // init page
  initPageList(): void {
    this.pageList = [];

    if (this.dataSourceLength < this.length && this.currentPage) {
      this.config = this.currentPage;
    }

    if (this.dataSourceLength > 0) {
      for (let i = 1; i <= this.config; i++) {
        this.pageList.push(i);
      }
    }
  }

  // on next
  onNext(): void {
    if (this.currentPage < this.config) {
      this.currentPage = this.currentPage + 1
      this.emitEvent(this.currentPage);
    } else {
      //
    }
  }

  get showPrevious(): boolean {
    return this.currentPage && this.currentPage > 1;
  }

  // on previous
  onPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1
      this.emitEvent(this.currentPage);
    }
  }

}

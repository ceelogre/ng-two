import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective implements OnInit {
  private regex: RegExp = new RegExp(/^[0-9]\d*$/);
  private specialKeys: Array<number> = [8, 9, 13, 16, 35, 36, 37, 39];
  @Input() isMoney: boolean;

  constructor(private el: ElementRef, private formatNumber: DecimalPipe) { }

  @HostListener('paste', ['$event']) onEvent(e: ClipboardEvent) {
    const next = e.clipboardData.getData('Text');
    if (next && !String(next).match(this.regex)) {
      e.preventDefault();
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (
      this.specialKeys.indexOf(e.keyCode) !== -1 ||
      ((e.ctrlKey || e.metaKey) && e.keyCode === 86) ||
      ((e.ctrlKey || e.metaKey) && e.keyCode === 67) ||
      ((e.ctrlKey || e.metaKey) && e.keyCode === 65)
    ) {
      return;
    }
    const current: string = this.el.nativeElement.value
    const next: string = current.concat(e.key).replace(/,/g, "");
    if (next && !String(next).match(this.regex)) {
      e.preventDefault();
    }
  }

  @HostListener('input', ['$event']) onChange(e: KeyboardEvent) {
    if (this.isMoney) {
      this.el.nativeElement.value = this.formatNumber.transform(this.el.nativeElement.value.replace(/,/g, ""));
    }
  }

  ngOnInit(): void {
    if (this.isMoney) {
      this.specialKeys.push(188);
    }
  }


}


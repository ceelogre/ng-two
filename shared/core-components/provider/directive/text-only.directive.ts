import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[textOnly]'
})
export class TextOnlyDirective {
  private regex: RegExp = new RegExp(/^[a-zA-Z ]*$/);
  private specialKeys: Array<number> = [8, 9, 13, 67, 16, 35, 36, 37, 39];

  constructor(private el: ElementRef) { }

  @HostListener('paste', ['$event']) onEvent(e: ClipboardEvent) {
    let next = e.clipboardData.getData('Text');
    if (next && !String(next).match(this.regex)) {
      e.preventDefault();
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (this.specialKeys.indexOf(e.keyCode) !== -1 || ((e.ctrlKey || e.metaKey) && e.keyCode == 86) || ((e.ctrlKey || e.metaKey) && e.keyCode == 67)) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(e.key);
    if (next && !String(next).match(this.regex)) {
      e.preventDefault();
    }
  }
}

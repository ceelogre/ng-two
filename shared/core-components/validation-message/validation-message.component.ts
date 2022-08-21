import { DataService } from './../../../provider/service/data.service';
import { FormControl } from '@angular/forms';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html'
})
export class ValidationMessageComponent implements OnInit, OnChanges {
  @Input() control: FormControl;
  @Input() length: number;

  constructor(private dataService: DataService) { }

  get translations() {
    return this.dataService.translations
  }

  ngOnInit() {

  }

  // track changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.control) {
      this.control = changes.control.currentValue;
    }
  }
}

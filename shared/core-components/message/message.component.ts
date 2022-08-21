import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnChanges {
  @Input() message: string = null;
  @Input() error = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.message) {
      this.message = changes?.message?.currentValue;
    }
    if (changes?.error) {
      this.error = changes?.error?.currentValue;
    }
  }

  // dismiss error
  dismiss(): void {
    this.message = null;
  }

}

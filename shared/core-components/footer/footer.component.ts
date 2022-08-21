import { DataService } from './../../../provider/service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  date = new Date().getFullYear();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  get translations() {
    return this.dataService.translations
  }

}

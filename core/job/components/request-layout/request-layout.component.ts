import { DataService } from 'src/app/provider/service/data.service';
import { StateService } from './../../../../provider/service/state.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-layout',
  templateUrl: './request-layout.component.html',
  styleUrls: ['./request-layout.component.css']
})
export class RequestLayoutComponent implements OnInit {

  constructor(public stateService: StateService, private dataService: DataService) { }

  get isOpened(): boolean {
    return this.dataService.sideBarOpen;
  }

  ngOnInit(): void {
  }

  closed(): void {
    this.dataService.toggleSideMenu(false);
  }
}

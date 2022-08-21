import { DataService } from './../../../provider/service/data.service';
import { StateService } from './../../../provider/service/state.service';
import { Component, OnInit } from '@angular/core';
import { IStats } from "../../../provider/model/user.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private stateService: StateService, private dataService: DataService) { }

  ngOnInit(): void {
  }

  get isOpened(): boolean {
    return this.dataService.sideBarOpen;
  }

  get isAdmin(): boolean {
    return this.stateService.isAdmin;
  }

  get isBailiff(): boolean {
    return this.stateService.isBailiff;
  }

  get isValuer(): boolean {
    return this.stateService.isValuer;
  }

  get userStats(): IStats {
    return this.stateService.userStats.data;
  }

  get translations() {
    return this.dataService.translations
  }

  close(): void {
    if (this.isOpened) {
      this.dataService.toggleSideMenu(false);
    }
  }

}

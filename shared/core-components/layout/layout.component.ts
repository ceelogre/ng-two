import { DataService } from './../../../provider/service/data.service';
import { IUser } from './../../../provider/model/user.model';
import { Component, OnInit } from '@angular/core';
import { EUserRole } from './../../../provider/enum/user-role.enum';
import { StateService } from './../../../provider/service/state.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public stateService: StateService, private dataService: DataService) { }

  get EUserRole() {
    return EUserRole
  }

  get authUser(): IUser {
    return this.stateService.authUser.data;
  }

  get isOpened(): boolean {
    return this.dataService.sideBarOpen;
  }

  ngOnInit(): void {
  }

  closed(): void {
    this.dataService.toggleSideMenu(false);
  }

}

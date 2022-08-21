import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { EfilterType } from 'src/app/provider/enum';
import { EStatePartial } from 'src/app/provider/enum/state-partial.enum';
import { IDataSourceConfig } from '../../../../provider/model/table.model';
import { IUser } from '../../../../provider/model/user.model';
import { DataService } from "../../../../provider/service/data.service";
import { StateService } from '../../../../provider/service/state.service';
import { UserService } from '../../providers/service/user.service';
import { EApplicationState } from './../../../../provider/enum/gender.enum';
import { EUserStatus } from './../../../../provider/enum/user-status.emun';
import { IMessage } from './../../../../provider/model/message.model';
import { IResponseObject } from './../../../../provider/model/response-object.model';
import { SearchForm } from './../../../../provider/model/search-form.model';
import { AdminService } from './../../../../provider/service/admin.service';
import { UserModalService } from './../../providers/service/user-modal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  usersTable: IDataSourceConfig;
  selectedUser: IUser;
  subscription: Subscription;
  message: IMessage;
  stringFilter: string = null;
  filterState: EApplicationState = null;
  searchForm: SearchForm;

  constructor(
    private stateService: StateService,
    private adminService: AdminService,
    private userService: UserService,
    private dataService: DataService,
    private userModalService: UserModalService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      if (message == EStatePartial.USERS.toString() || (this.stateService.isAdmin && message == EStatePartial.SELECTED_USER.toString())) {
        this.selectedUser = null;
        this.getUsers(true);
      }
    });
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get users(): IUser[] {
    return this.stateService.users.data;
  }

  get usersLoading(): boolean {
    return this.stateService.users.isLoading;
  }

  get EUserStatus() {
    return EUserStatus
  }

  get tableFiltering() {
    return !!this.stringFilter
  }

  get translations() {
    return this.dataService.translations
  }

  // get users
  getUsers(refetch = false, page: number = 0): void {
    if (this.users?.length === 0 || refetch || page > 1) {
      const mutation = EStatePartial.USERS;
      this.stateService.setState(mutation); // set loading = true
      this.adminService.getUsers(page).subscribe((res: IResponseObject<IUser[]>) => {
        if (res.status) {
          const { data } = res;
          this.stateService.setState(mutation, { isLoading: false, data }); // set state
          this.initTable(data, page);
        }
      });
    } else {
      this.initTable(this.users)
    }
  }

  filterByStatus(event): void {
    const mutation = EStatePartial.USERS;
    this.stateService.setState(mutation); // set loading = true
    this.adminService.getUsers(0, event).subscribe((res: IResponseObject<IUser[]>) => {
      if (res.status) {
        const { data } = res;
        this.stateService.setState(mutation, { isLoading: false, data }); // set state
        this.initTable(data);
      }
    });
  }



  // toggle user action warning
  toggleWarning(user?: IUser): void {
    this.userModalService.openUserMessageModal(user);
    this.userModalService.dialogRef.componentInstance.actionEvent.subscribe((res: IMessage) => {
      this.selectedUser = null;
    });
  }

  // toggle create/edit user modal
  toggleUser(user?: IUser): void {
    this.userModalService.openUserModal(user);
    this.userModalService.dialogRef.componentInstance.actionEvent.subscribe((res: IMessage) => {
      if (res.message) {
        this.message = res
        this.selectedUser = null;
      }
    });
  }

  onUserSelected(user: IUser): void {
    if (user?.id !== this.selectedUser?.id || !this.selectedUser) {
      this.selectedUser = user;
    } else {
      this.selectedUser = null
    }
  }

  // init users table
  initTable(data: any = null, page?: number): void {
    this.usersTable = {
      hasAction: true,
      fields: this.userService.fields,
      data: data ? data : this.users,
      page: page || 1,
      filterType: EfilterType.USER_STATUS,
      selectable: true
    }
  }

  // on pagination change
  onPagination(num: number): void {
    this.getUsers(true, num);
  }

  // receive filter input
  onSearchChange(e: string): void {
    this.stringFilter = e;
    if (!e || e.length == 0) {
      this.getUsers(true);
    } else if (e.length >= 10) {
      const mutation = EStatePartial.USERS;
      this.stateService.setState(mutation); // set loading = true
      this.adminService.searchUsers(e).subscribe((response: IResponseObject<IUser[]>) => {
        if (response.status) {
          const { data } = response;
          this.stateService.setState(mutation, { isLoading: false, data }); // set state
          this.initTable(data);
        }
      });
    }
  }

  refresh(event: any): void {
    this.getUsers(true);
  }

  //TODO => add refresh functionlity
  filterResults(event: any): void {
    this.filterState = event;
    this.searchForm.state = event;
  }

}

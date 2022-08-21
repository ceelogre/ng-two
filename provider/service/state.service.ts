import { IWithdraw } from './../../core/withdraw/providers/model/withdraw.model';
import { imageUrl } from './../util/base64-decoder.util';
import { IInspection, IRequest } from './../../core/job/providers/model/inspection.model';
import { Injectable } from '@angular/core';
import { EUserRole } from '../enum/user-role.enum';
import { IToken, ITransaction } from './../../core/credit/providers/model/transaction.model';
import { IStats, IUser } from '../model/user.model';
import { EStatePartial } from './../enum/state-partial.enum';
import { ISetState, IState, IStateData } from './../model/state.model';
import { IReport } from "../../core/report/provider/model/report.model";

@Injectable({
  providedIn: 'root'
})
export class StateService implements ISetState {

  // state init
  state: IStateData = {
    inspections: {
      data: [],
      isLoading: false
    },
    reports: {
      data: [],
      isLoading: false
    },
    transactions: {
      data: [],
      isLoading: false
    },
    tokens: {
      data: [],
      isLoading: false
    },
    users: {
      data: [],
      isLoading: false
    },
    selectedUser: {
      data: null,
      isLoading: false
    },
    selectedInspection: {
      data: null,
      isLoading: false
    },
    selectedRequest: {
      data: null,
      isLoading: false
    },
    authUser: {
      data: null,
      isLoading: false
    },
    userStats: {
      data: null,
      isLoading: false
    },
    requests: {
      data: [],
      isLoading: false
    },
    withdraws: {
      data: [],
      isLoading: false
    }
  };

  // get inspections
  get inspections(): IState<IInspection[]> {
    return this.state?.inspections;
  }

  // get inspections
  get reports(): IState<IReport[]> {
    return this.state?.reports;
  }

  // get transactions
  get transactions(): IState<ITransaction[]> {
    return this.state?.transactions;
  }

  // get transactions
  get requests(): IState<IRequest[]> {
    return this.state?.requests;
  }

  // get tokens
  get tokens(): IState<IToken[]> {
    return this.state?.tokens;
  }

  // get users
  get users(): IState<IUser[]> {
    return this.state?.users;
  }

  // get selected user
  get selectedUser(): IState<IUser> {
    return this.state?.selectedUser;
  }

  // get selected user
  get userStats(): IState<IStats> {
    return this.state?.userStats;
  }

  // get selected inspection
  get selectedInspection(): IState<IInspection | IRequest> {
    return this.state?.selectedInspection;
  }

  // get selected transaction
  get selectedRequest(): IState<IInspection> {
    return this.state?.selectedRequest;
  }

  // get selected user
  get authUser(): IState<IUser> {
    return this.state?.authUser;
  }

  // get profile
  get profilePicture(): string {
    if (this.authUser.data?.photo) {
      return imageUrl(this.authUser.data?.photo);
    } else {
      return null;
    }

  }

  // get inspections
  get withdraws(): IState<IWithdraw[]> {
    return this.state?.withdraws;
  }

  // ![is this in the right place] get is Valuer
  get isValuer(): boolean {
    return this.state?.authUser?.data.role === EUserRole.VALUER;
  }

  // ![is this in the right place] get is Bailiff
  get isBailiff(): boolean {
    return this.state?.authUser?.data.role === EUserRole.BAILIFF;
  }

  // ![is this in the right place] get is Admin
  get isAdmin(): boolean {
    return this.state?.authUser?.data.role === EUserRole.ADMIN || this.state?.authUser?.data.role === EUserRole.SUPER_ADMIN;
  }

  get isSuperAdmin(): boolean {
    return this.state?.authUser?.data.role === EUserRole.SUPER_ADMIN;
  }

  // mutate state using (partial enum)
  setState(partial: EStatePartial, state: IState<IInspection | IInspection[] | ITransaction |
    ITransaction[] | IUser | IUser[] | IStats | IToken[] | IRequest[] | IReport[] | IWithdraw[]> = { data: [], isLoading: true }): void {
    this.state[partial].data = state.data;
    this.state[partial].isLoading = state.isLoading || false;
  }

  // filter state using (partial enum)
  filterState(partial: EStatePartial.INSPECTIONS | EStatePartial.TRANSACTIONS | EStatePartial.USERS, input: string):
    IInspection[] | ITransaction[] | IUser[] {
    return this.state[partial].data.slice(); // TODO : implement filtering
  }

  clearAll() {
    this.state.reports.data = [];
    this.state.requests.data = [];
    this.state.tokens.data = [];
    this.state.userStats.data = null;
    this.state.authUser.data = null;
    this.state.inspections.data = [];
    this.state.selectedRequest.data = null;
    this.state.selectedInspection.data = null;
    this.state.selectedUser.data = null;
    this.state.transactions.data = [];
    this.state.users.data = [];
    this.state.withdraws.data = [];
  }


}

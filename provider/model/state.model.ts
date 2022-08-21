import { IWithdraw } from './../../core/withdraw/providers/model/withdraw.model';
import { IToken, ITransaction } from './../../core/credit/providers/model/transaction.model';
import { IInspection, IRequest } from './../../core/job/providers/model/inspection.model';
import { IStats, IUser } from './user.model';
import { EStatePartial } from './../enum/state-partial.enum';
import { IReport } from "../../core/report/provider/model/report.model";

export interface IState<T> {
  data: T;
  isLoading: boolean;
}

export interface IStateData {
  inspections: IState<IInspection[]>;
  transactions: IState<ITransaction[]>;
  tokens: IState<IToken[]>;
  users: IState<IUser[]>;
  authUser: IState<IUser>;
  selectedUser: IState<IUser>;
  selectedInspection: IState<IInspection>;
  selectedRequest: IState<IInspection>;
  userStats: IState<IStats>;
  requests: IState<IRequest[]>;
  reports: IState<IReport[]>;
  withdraws: IState<IWithdraw[]>;
}

export interface ISetState {
  setState(partial: EStatePartial, state: IState<IInspection | IInspection[] | ITransaction | ITransaction[] | IUser | IUser[] | IStats | IToken[] | IRequest[] | IReport[]>): void;
}



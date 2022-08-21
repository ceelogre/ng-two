import {ETransactionStatus} from "src/app/provider/enum/transaction.enum";
import {ILocation} from "../../../job/providers/model/parcel.model";
import {IUser} from "../../../../provider/model/user.model";

export interface ITransaction {
  id: string;
  index: number,
  amount: string;
  createdAt: string;
  transactionStatus: ETransactionStatus;
  status?: ETransactionStatus; // for status display
  financialTransactionId: string;
  currency: string;
  valuerId?: string;
  names?: string;
  category?:string;
  user?: IUser
}

export interface IToken {
  id: number;
  numberOfTickets: number;
  createdAt: string;
  location: ILocation;
  locationName: string,
  remainingTickets: number;
  cost: string;
  valuerId?: string;
  user?: IUser;
  valuerNames?: string;
}

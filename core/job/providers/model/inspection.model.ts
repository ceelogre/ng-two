import { ICordinates } from './../../../../provider/model/user.model';
import { EInspectionStatus } from './../../../../provider/enum/inspection-status.enum';
import { IParcel } from './parcel.model';
import { EApplicationState } from "../../../../provider/enum";
import { IUser } from "../../../../provider/model/user.model";

export interface IInspection extends ICordinates {
  id: string;
  refNumber: string;
  status: EInspectionStatus;
  state?: EApplicationState;
  property: IParcel;
  createdAt: string;
}

export interface IRequest extends ICordinates {
  id: string;
  upi: string;
  state: EApplicationState;
  status: EInspectionStatus,
  siteVisitId: string,
  parcel: IParcel;
  propertyType: string;
  location: string;
  createdAt: string;
  user?: IUser;
  valuerId?: string,
  valuerNames?: string,
  valuer?: IUser,
  bailiff?: IUser,
  bailiffNames: string,
  evaluationType: string,
  nationalId?: string,
  locked?: boolean,
  reportNumber?: string
}

export interface IReport {
  id: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

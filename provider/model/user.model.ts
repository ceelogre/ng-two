import { EUserRole } from '../enum/user-role.enum';
import { EGender } from '../enum/gender.enum';
import { EUserStatus } from '../enum/user-status.emun';

export interface IUser {
  id?: string;
  gender?: EGender;
  certificationYear?: number;
  firstName?: string;
  lastName?: string;
  username: string;
  role?: EUserRole;
  status?: EUserStatus;
  nationalId?: string;
  phoneNumber?: number;
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
  valuerId?: string;
  password?: string;
  displayNames?: string;
  photo?: string;
  newUsername?: string;

}

export interface IStats {
  id: string;
  balance: number;
  totalInspections: number;
  totalJobRequests: number;
  totalCompletedRequests: number;
  totalTickets: number;
  totalWithdraws: number;
  userId: string;
  createdAt: string;
  updatedAt: number;

}

export interface ICreatePaymentDto {
  userId: string,
  amount: number

}

export interface IPasswordRequest {
  userId: string;
  oldPassword: string;
  password: string;
}

export interface IInspectionDto extends ICordinates {
  parcelId: string;
  userId: string;
}

export interface IUpdateInspectionDto extends ICordinates {
  parcelId?: string;
  siteVisitId: string;
}

export interface ICordinates {
  xCoordinate?: string;
  yCoordinate?: string;
}

import {IValuation} from "./valuation.model";

export interface IParcel {
  id: string;
  upi: string;
  landUse: string;
  size: number;
  locationName: string;
  cellCode?: any;
  cellName?: any;
  sectorName?: any;
  districtName?: any;
  ownerId: string;
  ownerName?: any;
  hasRestriction: boolean;
  provinceCode?: string,
  provinceName?: string,
  xCoordinate: string,
  yCoordinate: string,
  remainingLeaseTerm: string
}

export interface ILocation {
  id: string,
  name: string,
  code: string,
  type: string
}

export interface IParcelDto {
  parcel: IParcel,
  valuationData: IValuation[]

}

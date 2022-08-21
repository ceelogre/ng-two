import { EPropertyAccess } from './../enum/property-access.enum';
import { EValuationMethod } from './../enum/valuation-method.enum';
import { IAttachment } from './attachment.model';
import { EValuationType } from '../enum/valuation-type.enum';
import { EPropertyType } from '../enum/property-type.enum';
import { IDraft } from "./draft.model";

export interface IValuation {
  siteVisitId: string;
  propertyType: EPropertyType;
  valuationType: EValuationType;
  insuranceValue: number;
  openMarketValue: number;
  forcedSaleValue: number;
  landValue: number;
  observation: string;
  properties: any;
  attachments: IAttachment[];
  valuationMethods: EValuationMethod[];
  createdAt?: string;
  draft?: IDraft;
  propertyAccess: EPropertyAccess;
  clientNames: string;
  inspectionDate: string;
}

import { IAttachment } from './attachment.model';
import { EvaluationForm } from './../enum/valuation-form.enum';
import { EValuationProperty } from './../enum/valuation-property.enum';
import { IParcel } from './parcel.model';

export interface IDraft {
  id?: string;
  userId?: string;
  siteVisitId?: string;
  time?: string;
  data: IDraftData;

}

export interface IDraftData {
  parcel: IParcel,
  valuationData: Map<EValuationProperty, any>,
  formData: EvaluationForm,
  otherAttachments?: IAttachment[];
  otherAttachmentsArr?: any[];

}

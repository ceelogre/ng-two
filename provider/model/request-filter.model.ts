import {SearchForm} from './search-form.model';

export interface RequestFilter extends SearchForm {
  valuerId: string;
  baillifId: string;
  upi: string;
  siteVisitId: string;
}

export interface IDateFilter {
  startDate: string,
  endDate: string,
}

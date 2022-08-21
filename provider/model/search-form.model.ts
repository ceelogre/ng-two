import { ESort } from './../enum/sort.enum';
import { EApplicationState, EInspectionStatus } from "../enum";

export interface SearchForm {
  sortDir: ESort; // for sorting
  start: number; // pagination start offset
  length: number; // pagination record length
  sort: string; // sort fields
  state: EApplicationState,
  status: EInspectionStatus,
  startDate: string,
  endDate: string,
  userId: string; // filter userIs
  id?: string; // filter by visitID
  search?: string;
}

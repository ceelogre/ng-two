import { EfilterType } from './../enum/filter-type.enum';

// model/types for irpv table
export interface IDataSourceConfig {
  hasAction?: boolean;
  fields: ItableField[];
  data: any[];
  filteredData?: any[];
  page: number;
  filterType: EfilterType | undefined;
  selectable?: boolean,
}

export interface ItableField {
  name: string;
  key: string;
  clickable?: boolean;
  isDate?: boolean;
  isStatus?: boolean;
  isRole?: boolean;
  isId?: boolean;
  isRequest?: boolean;
  isReport?: boolean;
  isActionable?: boolean;
  isMoney?: boolean;
}

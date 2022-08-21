import { ESort } from './../enum/sort.enum';
import { RequestFilter } from './../model/request-filter.model';
import { SearchForm } from '../model/search-form.model';

export const paginateSearch = (
  sortDir = ESort.DESC,
  start = 0,
  length = 10,
  sort = 'updatedAt',
  state = null,
  status = null,
  startDate = null,
  endDate = null,
  search = null,
  userId = null,
  id = null): SearchForm => {
  return {
    sortDir,
    start,
    length,
    sort,
    state,
    status,
    startDate,
    endDate,
    search,
    userId,
    id
  }
};

export const paginateRequest = (
  sortDir = ESort.DESC,
  start = 0,
  length = 10,
  sort = 'createdAt',
  userId = null,
  valuerId = null,
  baillifId = null,
  state = null,
  status = null,
  startDate = null,
  endDate = null,
  search = null,
  upi = null,
  siteVisitId = null
): RequestFilter => {
  return {
    sortDir,
    start,
    length,
    sort,
    userId,
    valuerId,
    baillifId,
    upi,
    state,
    status,
    startDate,
    endDate,
    search,
    siteVisitId
  }
};


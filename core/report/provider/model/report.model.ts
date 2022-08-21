export interface IReport {
  id: string,
  index: number,
  createdAt: string,
  startDate: string,
  endDate: string,
  status: string,
  title: string,
  reportType?: string,
  siteVisitId: string

}

export interface IResponseObject<T> {
  status: boolean;
  data: T;
  message: string;
}

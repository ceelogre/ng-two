export interface IGenValue<T> {
  name: string | any;
  value: T,
};

export interface IGenValueData<T, U = null> {
  name: string | any;
  value: T,
  type?: U
};

export interface ICreateToken {
  userId: string;
  numberOfTickets: number;
  locationId: string;
}

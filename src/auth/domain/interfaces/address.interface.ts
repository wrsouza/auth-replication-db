import { IUser } from './user.interface';

export interface IAddressValues {
  postalCode: string;
  lineAddress: string;
  city: string;
  state: string;
}

export interface IAddress {
  userId?: string;
  postalCode: string;
  lineAddress: string;
  city: string;
  state: string;
  user?: IUser;
}

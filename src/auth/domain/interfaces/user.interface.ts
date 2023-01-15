import { Address } from '../address';
import { Role } from '../role';
import { UserId } from '../user-id';
import { IAddress } from './address.interface';
import { IRole } from './role.interface';

export interface IUserValues {
  id?: UserId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  address: Address;
  roles: Role[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  address?: IAddress;
  roles?: IRole[];
}

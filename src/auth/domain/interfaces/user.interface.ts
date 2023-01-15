import { Role } from '../role';
import { UserId } from '../user-id';
import { IRole } from './role.interface';

export interface IUserValues {
  id?: UserId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
  roles?: IRole[];
}

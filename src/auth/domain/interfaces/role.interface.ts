import { Permission } from '../permission';
import { RoleId } from '../role-id';
import { IPermission } from './permission.interface';

export interface IRoleValues {
  id?: RoleId;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  permissions: Permission[];
}

export interface IRole {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  permissions?: IPermission[];
}

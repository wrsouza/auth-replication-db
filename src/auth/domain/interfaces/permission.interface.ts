import { PermissionId } from '../permission-id';
import { IRole } from './role.interface';

export interface IPermissionValues {
  id?: PermissionId;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPermission {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  roles?: IRole[];
}

import { Entity } from '../../common/domain/entity';
import { IPermission, IPermissionValues } from './interfaces';
import { PermissionId } from './permission-id';

export class Permission extends Entity<PermissionId> {
  private _name: string;
  private _description: string;

  constructor(permission: IPermissionValues) {
    super();
    this._id = permission.id;
    this._name = permission.name;
    this._description = permission.description;
    this._createdAt = permission.createdAt;
    this._updatedAt = permission.updatedAt;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  update(permission: Partial<IPermission>) {
    if (permission.name) {
      this._name = permission.name;
    }
    if (permission.description) {
      this._description = permission.description;
    }
  }
}

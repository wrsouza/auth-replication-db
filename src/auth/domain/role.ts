import { Entity } from '../../common/domain/entity';
import { IRole, IRoleValues } from './interfaces';
import { Permission } from './permission';
import { RoleId } from './role-id';

export class Role extends Entity<RoleId> {
  private _name: string;
  private _description: string;
  private _permissions: Permission[];

  constructor(role: IRoleValues) {
    super();
    this._id = role.id;
    this._name = role.name;
    this._description = role.description;
    this._createdAt = role.createdAt;
    this._updatedAt = role.updatedAt;
    this._permissions = role.permissions;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get permissions(): Permission[] {
    return this._permissions;
  }

  update(role: Partial<IRole>) {
    if (role.name) {
      this._name = role.name;
    }
    if (role.description) {
      this._description = role.description;
    }
  }
}

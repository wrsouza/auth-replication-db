import { Injectable } from '@nestjs/common';
import { IMapper } from '../../common/domain';
import { Permission, Role, RoleId } from '../domain';
import { IPermission, IRole } from '../domain/interfaces';
import { PermissionMapper } from './permission.mapper';

@Injectable()
export class RoleMapper implements IMapper<Role, IRole> {
  constructor(private readonly permissionMapper: PermissionMapper) {}

  toPersistence(entity: Role): IRole {
    return {
      id: entity.id.value,
      name: entity.name,
      description: entity.description,
      permissions: entity.permissions.map((permission: Permission) =>
        this.permissionMapper.toPersistence(permission),
      ),
    };
  }

  toDomain(record: IRole): Role {
    return new Role({
      id: new RoleId(record.id),
      name: record.name,
      description: record.description,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      permissions: record.permissions.map((permission: IPermission) =>
        this.permissionMapper.toDomain(permission),
      ),
    });
  }
}

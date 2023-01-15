import { Injectable } from '@nestjs/common';
import { IMapper } from '../../common/domain';
import { Permission, PermissionId } from '../domain';
import { IPermission } from '../domain/interfaces';

@Injectable()
export class PermissionMapper implements IMapper<Permission, IPermission> {
  toPersistence(entity: Permission): IPermission {
    return {
      id: entity.id.value,
      name: entity.name,
      description: entity.description,
    };
  }

  toDomain(record: IPermission): Permission {
    return new Permission({
      id: new PermissionId(record.id),
      name: record.name,
      description: record.description,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}

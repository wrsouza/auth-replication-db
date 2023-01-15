import { Injectable } from '@nestjs/common';
import { IMapper } from '../../common/domain';
import { Role, User, UserId } from '../domain';
import { IRole, IUser } from '../domain/interfaces';
import { RoleMapper } from './role.mapper';

@Injectable()
export class UserMapper implements IMapper<User, IUser> {
  constructor(private readonly roleMapper: RoleMapper) {}

  toPersistence(entity: User): IUser {
    return {
      id: entity.id.value,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      isAdmin: entity.isAdmin,
      roles: entity.roles.map((role: Role) =>
        this.roleMapper.toPersistence(role),
      ),
    };
  }

  toDomain(record: IUser): User {
    const id = new UserId(record.id);
    return new User({
      id,
      name: record.name,
      email: record.email,
      password: record.password,
      isAdmin: record.isAdmin,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      roles: record.roles.map((role: IRole) => this.roleMapper.toDomain(role)),
    });
  }
}

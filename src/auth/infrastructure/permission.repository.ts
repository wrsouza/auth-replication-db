import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PermissionEntity } from '../../data/database/entities/permission.entity';
import { Permission } from '../domain';
import { IPermission } from '../domain/interfaces';
import { PermissionMapper } from './permission.mapper';

export class PermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private repository: Repository<IPermission>,
    private readonly mapper: PermissionMapper,
  ) {}

  async save(entity: Permission): Promise<void> {
    const record = this.mapper.toPersistence(entity);
    await this.repository.save(record);
  }

  async findOne(where: FindOptionsWhere<IPermission>): Promise<Permission> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}

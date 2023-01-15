import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RoleEntity } from '../../data/database/entities';
import { Role } from '../domain';
import { IRole } from '../domain/interfaces';
import { RoleMapper } from './role.mapper';

export class RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<IRole>,
    private readonly mapper: RoleMapper,
  ) {}

  async save(entity: Role): Promise<void> {
    const record = this.mapper.toPersistence(entity);
    await this.repository.save(record);
  }

  async findOne(where: FindOptionsWhere<IRole>): Promise<Role> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}

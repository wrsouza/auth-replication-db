import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../../../../data/database/entities';

import { IPermission } from '../../../domain/interfaces';
import { PermissionMapper } from '../../../infrastructure';
import { PermissionDetailsQuery } from './permission-details.query';
import { PermissionDetailsResponse } from './permission-details.response';

@QueryHandler(PermissionDetailsQuery)
export class PermissionDetailsHandler
  implements IQueryHandler<PermissionDetailsQuery>
{
  constructor(
    @InjectRepository(PermissionEntity)
    private repository: Repository<IPermission>,
    private readonly mapper: PermissionMapper,
  ) {}

  async execute({
    id,
  }: PermissionDetailsQuery): Promise<PermissionDetailsResponse> {
    const record = await this.repository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('permission not found');
    }
    const permission = this.mapper.toDomain(record);
    return new PermissionDetailsResponse(permission);
  }
}

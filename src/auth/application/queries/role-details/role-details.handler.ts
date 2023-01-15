import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../../../data/database/entities';
import { IRole } from '../../../domain/interfaces';
import { RoleMapper } from '../../../infrastructure';
import { RoleDetailsQuery } from './role-details.query';
import { RoleDetailsResponse } from './role-details.response';

@QueryHandler(RoleDetailsQuery)
export class RoleDetailsHandler implements IQueryHandler<RoleDetailsQuery> {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<IRole>,
    private readonly mapper: RoleMapper,
  ) {}

  async execute({ id }: RoleDetailsQuery): Promise<RoleDetailsResponse> {
    const record = await this.repository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!record) {
      throw new NotFoundException('role not found');
    }
    const role = this.mapper.toDomain(record);
    return new RoleDetailsResponse(role);
  }
}

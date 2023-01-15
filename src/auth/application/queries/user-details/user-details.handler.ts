import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../../data/database/entities';
import { IUser } from '../../../domain/interfaces';
import { UserMapper } from '../../../infrastructure';
import { UserDetailsQuery } from './user-details.query';
import { UserDetailsResponse } from './user-details.response';

@QueryHandler(UserDetailsQuery)
export class UserDetailsHandler implements IQueryHandler<UserDetailsQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<IUser>,
    private readonly mapper: UserMapper,
  ) {}

  async execute({ id }: UserDetailsQuery): Promise<UserDetailsResponse> {
    const record = await this.repository.findOne({
      where: { id },
      relations: ['roles', 'roles.permissions'],
    });
    if (!record) {
      throw new NotFoundException('user not found');
    }
    const user = this.mapper.toDomain(record);
    return new UserDetailsResponse(user);
  }
}

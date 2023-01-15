import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../../data/database/entities';
import { IUser } from '../../../domain/interfaces';
import { UserMapper } from '../../../infrastructure';
import { UserValidateQuery } from './user-validate.query';
import { UserValidateResponse } from './user-validate.response';

@QueryHandler(UserValidateQuery)
export class UserValidateHandler implements IQueryHandler<UserValidateQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<IUser>,
    private readonly userMapper: UserMapper,
  ) {}

  async execute({
    request: where,
  }: UserValidateQuery): Promise<UserValidateResponse> {
    const record = await this.repository.findOne({
      where,
      relations: ['roles', 'roles.permissions'],
    });
    if (!record) {
      throw new NotFoundException('user not found');
    }
    const user = this.userMapper.toDomain(record);
    return new UserValidateResponse(user);
  }
}

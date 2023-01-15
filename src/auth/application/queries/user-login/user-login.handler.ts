import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from '../../../../data/database/entities/user.entity';
import { JwtService } from '../../../../data/jwt/jwt.service';
import { Encrypt } from '../../../../data/utils';
import { IUser } from '../../../domain/interfaces/user.interface';
import { UserLoginQuery } from './user-login.query';
import { UserLoginResponse } from './user-login.response';

@QueryHandler(UserLoginQuery)
export class UserLoginHandler implements IQueryHandler<UserLoginQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<IUser>,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ request }: UserLoginQuery): Promise<UserLoginResponse> {
    const { email, password } = request;

    const record = await this.repository.findOneBy({ email });
    if (!record) {
      throw new BadRequestException('email or password invalid');
    }

    if (!Encrypt.compare(password, record.password)) {
      throw new BadRequestException('email or password invalid');
    }

    const token = this.jwtService.tokenGenerator(record.id, {
      email: record.email,
    });
    return new UserLoginResponse(token);
  }
}

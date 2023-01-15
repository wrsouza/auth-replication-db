import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from '../../data/database/entities';
import { User } from '../domain';
import { IUser } from '../domain/interfaces';
import { UserMapper } from './user.mapper';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<IUser>,
    private readonly mapper: UserMapper,
  ) {}

  async save(entity: User): Promise<void> {
    const record = this.mapper.toPersistence(entity);
    await this.repository.save(record);
  }

  async findOne(where: FindOptionsWhere<IUser>): Promise<User> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}

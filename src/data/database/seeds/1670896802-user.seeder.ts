import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { v4 as uuid } from 'uuid';
import { Encrypt } from '../../utils';
import { RoleEntity, UserEntity } from '../entities';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleRepository = dataSource.getRepository(RoleEntity);
    const roles = await roleRepository.find({});
    const repository = dataSource.getRepository(UserEntity);
    await repository.save([
      {
        id: uuid(),
        name: 'John Doe',
        email: 'john.doe@domain.com',
        password: Encrypt.hash('password'),
        isAdmin: false,
        address: {
          postalCode: faker.address.zipCode().replace(/\D/g, ''),
          lineAddress: faker.address.streetAddress(true),
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
        },
        roles,
      },
    ]);
  }
}

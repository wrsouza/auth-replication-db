import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Encrypt } from '../../../../data/utils';
import { Role, User, UserId } from '../../../domain';
import { RoleRepository, UserRepository } from '../../../infrastructure';
import { UserCreatedSnsEvent } from '../../events';
import { CreateUserCommand } from './create-user.command';
import { CreateUserResponse } from './create-user.response';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    createUser,
  }: CreateUserCommand): Promise<CreateUserResponse> {
    const { email } = createUser;
    await this.userExists(email);
    const encryptedPassword = Encrypt.hash(createUser.password);
    const roles = await this.getRoles(createUser.roles);
    const user = new User({
      ...createUser,
      id: new UserId(),
      password: encryptedPassword,
      roles,
    });
    await this.userRepository.save(user);

    const event = new UserCreatedSnsEvent(user);
    this.eventBus.publish(event);

    return new CreateUserResponse(user);
  }

  async userExists(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new BadRequestException('user already exists.');
    }
  }

  async getRoles(roleIds: string[]): Promise<Role[]> {
    const roles: Role[] = [];
    for (const roleId of roleIds) {
      const role = await this.findRole(roleId);
      roles.push(role);
    }
    return roles;
  }

  async findRole(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ id });
    if (!role) {
      throw new NotFoundException(`role ${id} not found`);
    }
    return role;
  }
}

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Permission, Role, RoleId } from '../../../domain';
import { PermissionRepository, RoleRepository } from '../../../infrastructure';
import { CreateRoleCommand } from './create-role.command';
import { CreateRoleRequest } from './create-role.request';
import { CreateRoleResponse } from './create-role.response';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ createRole }: CreateRoleCommand): Promise<any> {
    await this.roleExists(createRole.name);
    const permissions = await this.getPermissions(createRole);
    const role = new Role({
      ...createRole,
      id: new RoleId(),
      permissions,
    });
    await this.roleRepository.save(role);

    return new CreateRoleResponse(role);
  }

  async getPermissions(createRole: CreateRoleRequest): Promise<Permission[]> {
    const permissions: Permission[] = [];
    for (const permissionId of createRole.permissions) {
      const permission = await this.findPermission(permissionId);
      permissions.push(permission);
    }
    return permissions;
  }

  async findPermission(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({ id });
    if (!permission) {
      throw new NotFoundException(`permission ${id} not found`);
    }
    return permission;
  }

  async roleExists(name: string): Promise<void> {
    const role = await this.roleRepository.findOne({ name });
    if (role) {
      throw new BadRequestException('role already exists.');
    }
  }
}

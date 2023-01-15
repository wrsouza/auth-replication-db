import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Permission, PermissionId } from '../../../domain';
import { PermissionRepository } from '../../../infrastructure';
import { CreatePermissionCommand } from './create-permission.command';
import { CreatePermissionResponse } from './create-permission.response';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler
  implements ICommandHandler<CreatePermissionCommand>
{
  constructor(
    private readonly repository: PermissionRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ createPermission }: CreatePermissionCommand): Promise<any> {
    await this.permissionExists(createPermission.name);
    const permission = new Permission({
      ...createPermission,
      id: new PermissionId(),
    });
    await this.repository.save(permission);

    return new CreatePermissionResponse(permission);
  }

  async permissionExists(name: string): Promise<void> {
    const permission = await this.repository.findOne({ name });
    if (permission) {
      throw new BadRequestException('permission already exists.');
    }
  }
}

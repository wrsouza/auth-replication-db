import { ICommand } from '@nestjs/cqrs';
import { CreatePermissionRequest } from './create-permission.request';

export class CreatePermissionCommand implements ICommand {
  constructor(readonly createPermission: CreatePermissionRequest) {}
}

import { ICommand } from '@nestjs/cqrs';
import { CreateRoleRequest } from './create-role.request';

export class CreateRoleCommand implements ICommand {
  constructor(readonly createRole: CreateRoleRequest) {}
}

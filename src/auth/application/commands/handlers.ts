import { CreatePermissionHandler } from './create-permission/create-permission.handler';
import { CreateRoleHandler } from './create-role/create-role.handler';
import { CreateUserHandler } from './create-user/create-user.handler';

export const CommandHandlers = [
  CreateUserHandler,
  CreateRoleHandler,
  CreatePermissionHandler,
];

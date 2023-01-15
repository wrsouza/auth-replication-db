import { PermissionDetailsHandler } from './permission-details/permission-details.handler';
import { RoleDetailsHandler } from './role-details/role-details.handler';
import { UserDetailsHandler } from './user-details/user-details.handler';
import { UserLoginHandler } from './user-login/user-login.handler';
import { UserValidateHandler } from './user-validate/user-validate.handler';

export const QueryHandlers = [
  UserLoginHandler,
  UserValidateHandler,
  UserDetailsHandler,
  RoleDetailsHandler,
  PermissionDetailsHandler,
];

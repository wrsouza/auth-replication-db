import { IQuery } from '@nestjs/cqrs';
import { UserLoginRequest } from './user-login.request';

export class UserLoginQuery implements IQuery {
  constructor(readonly request: UserLoginRequest) {}
}

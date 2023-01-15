import { IQuery } from '@nestjs/cqrs';
import { UserValidateRequest } from './user-validate.request';

export class UserValidateQuery implements IQuery {
  constructor(readonly request: UserValidateRequest) {}
}

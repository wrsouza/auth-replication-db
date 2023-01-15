import { IEvent } from '@nestjs/cqrs';
import { User } from '../../../domain';

export class UserCreatedSnsEvent implements IEvent {
  constructor(readonly user: User) {}
}

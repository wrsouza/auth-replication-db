import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedSnsEvent } from './user-created-sns.event';

@EventsHandler(UserCreatedSnsEvent)
export class UserCreatedSnsHandler
  implements IEventHandler<UserCreatedSnsEvent>
{
  handle({ user }: UserCreatedSnsEvent) {
    Logger.log(`user: ${JSON.stringify(user)}`);
    throw new Error('Method not implemented.');
  }
}

import { User } from '../../../domain';

export class CreateUserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: Date;

  constructor(user: User) {
    this.id = user.id.value;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
  }
}

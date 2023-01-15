import { User } from '../../../domain';

export class UserValidateResponse {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  roles: string[];

  constructor(user: User) {
    this.id = user.id.value;
    this.name = user.name;
    this.email = user.email;
    this.isAdmin = user.isAdmin;
    this.createdAt = user.createdAt.toISOString();
    this.roles = user.roles.reduce(
      (prev, role) => [
        ...prev,
        ...role.permissions.map((permission) => permission.name),
      ],
      [],
    );
  }
}

import { Role } from '../../../domain';

export class CreateRoleResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor(role: Role) {
    this.id = role.id.value;
    this.name = role.name;
    this.description = role.description;
    this.createdAt = role.createdAt;
  }
}

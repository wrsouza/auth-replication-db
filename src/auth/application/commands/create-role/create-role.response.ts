import { Role } from '../../../domain';

export class CreateRoleResponse {
  id: string;
  name: string;
  description: string;
  permissions: string[];

  constructor(role: Role) {
    this.id = role.id.value;
    this.name = role.name;
    this.description = role.description;
    this.permissions = role.permissions.map(
      (permission) => permission.id.value,
    );
  }
}

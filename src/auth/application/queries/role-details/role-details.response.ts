import { Role } from '../../../domain';

export class RoleDetailsResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  permissions: string[];

  constructor(role: Role) {
    this.id = role.id.value;
    this.name = role.name;
    this.description = role.description;
    this.createdAt = role.createdAt.toISOString();
    this.permissions = role.permissions.map(
      (permission) => permission.id.value,
    );
  }
}

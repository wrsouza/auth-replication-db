import { Permission } from '../../../domain';

export class PermissionDetailsResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;

  constructor(permission: Permission) {
    this.id = permission.id.value;
    this.name = permission.name;
    this.description = permission.description;
    this.createdAt = permission.createdAt.toISOString();
  }
}

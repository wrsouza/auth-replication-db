import { Permission } from '../../../domain';

export class CreatePermissionResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor(permission: Permission) {
    this.id = permission.id.value;
    this.name = permission.name;
    this.description = permission.description;
    this.createdAt = permission.createdAt;
  }
}

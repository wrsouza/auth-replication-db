import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './base';
import { RoleEntity } from './role.entity';

@Entity('permissions')
export class PermissionEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions, {
    onDelete: 'CASCADE',
  })
  roles: RoleEntity[];
}

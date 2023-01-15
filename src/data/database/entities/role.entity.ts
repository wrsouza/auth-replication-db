import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base';
import { PermissionEntity } from './permission.entity';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionEntity[];

  @ManyToMany(() => UserEntity, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  users: UserEntity[];
}

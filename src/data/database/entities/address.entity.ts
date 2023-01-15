import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity extends BaseEntity {
  @Column({ name: 'postal_code', type: 'varchar', length: 8 })
  postalCode: string;

  @Column({ name: 'line_address', type: 'varchar', length: 255 })
  lineAddress: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 2 })
  state: string;

  @OneToOne(() => UserEntity, (user) => user.address, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain';

class AddressDetailsReponse {
  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  lineAddress: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}

export class UserDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({
    type: AddressDetailsReponse,
  })
  address: AddressDetailsReponse;

  @ApiProperty()
  roles: string[];

  constructor(user: User) {
    this.id = user.id.value;
    this.name = user.name;
    this.email = user.email;
    this.isAdmin = user.isAdmin;
    this.createdAt = user.createdAt.toISOString();

    const { address } = user;
    this.address = {
      postalCode: address.postalCode,
      lineAddress: address.lineAddress,
      city: address.city,
      state: address.state,
    };

    this.roles = user.roles.map((role) => role.id.value);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';

class CreateUserAddressRequest {
  @ApiProperty({
    minLength: 8,
    maxLength: 8,
    example: '57868-584',
  })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  postalCode: string;

  @ApiProperty({
    maxLength: 255,
    example: '095 Casper Loaf Apt. 374',
  })
  @IsString()
  lineAddress: string;

  @ApiProperty({
    maxLength: 50,
    example: 'Jakeview',
  })
  @IsString()
  city: string;

  @ApiProperty({
    minLength: 2,
    maxLength: 2,
    example: 'CO',
  })
  @IsString()
  state: string;
}

export class CreateUserRequest {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@domain.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    example: 'password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({
    type: CreateUserAddressRequest,
  })
  @ValidateNested()
  @Type(() => CreateUserAddressRequest)
  address: CreateUserAddressRequest;

  @ApiProperty({
    type: [String],
    example: [],
  })
  @IsArray()
  roles: string[];
}

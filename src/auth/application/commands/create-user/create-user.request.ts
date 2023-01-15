import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsString } from 'class-validator';

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
    type: [String],
    example: [],
  })
  @IsArray()
  roles: string[];
}

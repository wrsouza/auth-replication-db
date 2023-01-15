import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserLoginRequest {
  @ApiProperty({
    type: String,
    example: 'john.doe@domain.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'password',
  })
  @IsString()
  password: string;
}

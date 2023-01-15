import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../data/guards/jwt-auth.guard';
import {
  UserLoginQuery,
  UserLoginRequest,
  UserLoginResponse,
} from '../application/queries';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('login')
  login(@Body() request: UserLoginRequest): Promise<UserLoginResponse> {
    const query = new UserLoginQuery(request);
    return this.queryBus.execute(query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('validate')
  validate(@Request() { user }) {
    const { roles, ...result } = user;
    return result;
  }
}

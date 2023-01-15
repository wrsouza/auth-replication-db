import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators';
import { JwtAuthGuard } from '../../data/guards/jwt-auth.guard';
import {
  CreateUserCommand,
  CreateUserRequest,
  CreateUserResponse,
} from '../application/commands';
import {
  UserDetailsQuery,
  UserDetailsRequest,
  UserDetailsResponse,
} from '../application/queries';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Roles('create-user')
  @UseGuards(JwtAuthGuard)
  async createUser(
    @Body() request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const command = new CreateUserCommand(request);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  @Roles('user-details')
  @UseGuards(JwtAuthGuard)
  async userDetails(
    @Body() request: UserDetailsRequest,
  ): Promise<UserDetailsResponse> {
    const query = new UserDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}

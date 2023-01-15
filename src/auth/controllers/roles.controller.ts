import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators';
import { JwtAuthGuard } from '../../data/guards/jwt-auth.guard';
import {
  CreateRoleCommand,
  CreateRoleRequest,
  CreateRoleResponse,
} from '../application/commands';
import {
  RoleDetailsQuery,
  RoleDetailsRequest,
  RoleDetailsResponse,
} from '../application/queries';

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Roles('create-role')
  @UseGuards(JwtAuthGuard)
  createRole(@Body() request: CreateRoleRequest): Promise<CreateRoleResponse> {
    const command = new CreateRoleCommand(request);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  @Roles('role-details')
  @UseGuards(JwtAuthGuard)
  roleDetails(
    @Param() request: RoleDetailsRequest,
  ): Promise<RoleDetailsResponse> {
    const query = new RoleDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}

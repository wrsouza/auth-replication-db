import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators';
import { JwtAuthGuard } from '../../data/guards/jwt-auth.guard';
import {
  CreatePermissionCommand,
  CreatePermissionRequest,
  CreatePermissionResponse,
} from '../application/commands';
import {
  PermissionDetailsQuery,
  PermissionDetailsRequest,
  PermissionDetailsResponse,
} from '../application/queries';

@ApiBearerAuth()
@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Roles('create-permission')
  @UseGuards(JwtAuthGuard)
  createPermission(
    @Body() request: CreatePermissionRequest,
  ): Promise<CreatePermissionResponse> {
    const command = new CreatePermissionCommand(request);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  @Roles('permission-details')
  @UseGuards(JwtAuthGuard)
  permissionDetails(
    @Param() request: PermissionDetailsRequest,
  ): Promise<PermissionDetailsResponse> {
    const query = new PermissionDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}

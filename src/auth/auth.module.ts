import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '../data/config/app.config';
import {
  AddressEntity,
  PermissionEntity,
  RoleEntity,
  UserEntity,
} from '../data/database/entities';
import { JwtService } from '../data/jwt/jwt.service';
import { QueryHandlers } from './application/queries/handlers';
import { AuthController } from './controllers/auth.controller';
import { PermissionsController } from './controllers/permissions.controller';
import { RolesController } from './controllers/roles.controller';
import { UsersController } from './controllers/users.controller';
import {
  PermissionMapper,
  PermissionRepository,
  RoleMapper,
  RoleRepository,
  UserMapper,
} from './infrastructure';
import { UserRepository } from './infrastructure/user.repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      UserEntity,
      AddressEntity,
      RoleEntity,
      PermissionEntity,
    ]),
  ],
  controllers: [
    AuthController,
    UsersController,
    RolesController,
    PermissionsController,
  ],
  providers: [
    UserRepository,
    RoleRepository,
    PermissionRepository,
    UserMapper,
    RoleMapper,
    PermissionMapper,
    JwtService,
    AppConfig,
    ...QueryHandlers,
  ],
})
export class AuthModule {}

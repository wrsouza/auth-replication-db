import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { QueryBus } from '@nestjs/cqrs';
import {
  UserValidateQuery,
  UserValidateResponse,
} from '../../auth/application/queries';
import { ROLES_KEY } from '../../common/decorators';
import { JwtService } from '../jwt/jwt.service';

interface Payload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const prefix = 'Bearer ';
    const accessToken = request.get('Authorization');
    if (!accessToken || !accessToken.includes(prefix)) {
      return false;
    }

    const payload: Payload = this.jwtService.tokenVerify(accessToken);
    if (!payload) {
      return false;
    }

    const query = new UserValidateQuery({
      id: payload.sub,
      email: payload.email,
    });
    const user: UserValidateResponse = await this.queryBus.execute(query);
    if (!user) {
      return false;
    }
    request.user = user;

    if (user.isAdmin) {
      return true;
    }

    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const hasRole: boolean = requiredRoles.some((role) =>
      user.roles?.includes(role),
    );
    return hasRole;
  }
}

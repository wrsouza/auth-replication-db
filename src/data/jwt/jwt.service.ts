import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { AppConfig } from '../config/app.config';

@Injectable()
export class JwtService {
  constructor(private appConfig: AppConfig) {}

  tokenVerify(accessToken: string): any {
    try {
      return verify(accessToken.split(' ')[1], this.appConfig.jwt.secret);
    } catch (err) {
      return null;
    }
  }

  tokenGenerator(sub: string, data: any): string {
    const payload = { ...data, sub };
    const token = sign(payload, this.appConfig.jwt.secret, {
      expiresIn: this.appConfig.jwt.expires,
    });
    return token;
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabase, IJwt } from './app.interface';

@Injectable()
export class AppConfig {
  constructor(private configService: ConfigService) {}

  get environment(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  get database(): IDatabase {
    return {
      type: this.configService.get<string>('CONNECTION_TYPE'),
      masterUrl: this.configService.get<string>('MASTER_URL_CONNECTION'),
      slaveUrl: this.configService.get<string>('SLAVE_URL_CONNECTION'),
    };
  }

  get jwt(): IJwt {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
      expires: this.configService.get<string>('JWT_EXPIRES'),
    };
  }
}

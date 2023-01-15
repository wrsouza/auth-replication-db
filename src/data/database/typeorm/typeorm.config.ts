import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) =>
    configService.get<string>('NODE_ENV') !== 'test'
      ? ({
          type: configService.get<string>('CONNECTION_TYPE'),
          replication: {
            master: {
              url: configService.get<string>('MASTER_URL_CONNECTION'),
            },
            slaves: [
              {
                url: configService.get<string>('SLAVE_URL_CONNECTION'),
              },
            ],
          },
          entities: [`${__dirname}/../entities/*.entity{.js,.ts}`],
          synchronize: false,
          logging: true,
          keepConnectionAlive: true,
        } as TypeOrmModuleOptions)
      : ({
          type: 'better-sqlite3',
          database: ':memory:',
          entities: [`${__dirname}/../entities/*.entity{.js,.ts}`],
          synchronize: true,
          logging: false,
          dropSchema: true,
        } as TypeOrmModuleOptions),
  inject: [ConfigService],
};

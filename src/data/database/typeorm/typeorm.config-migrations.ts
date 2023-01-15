import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const typeOrmConfig = new DataSource({
  type: process.env.CONNECTION_TYPE,
  replication: {
    master: {
      url: process.env.MASTER_URL_CONNECTION,
    },
    slaves: [
      {
        url: process.env.SLAVE_URL_CONNECTION,
      },
    ],
  },
  entities: [`${__dirname}/../entities/*.entity{.js,.ts}`],
  seeds: [`${__dirname}/../seeds/*.seeder{.js,.ts}`],
  synchronize: false,
  logging: true,
  migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
} as DataSourceOptions);

export default typeOrmConfig;

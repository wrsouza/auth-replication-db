import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Postgres Streaming Replication Project')
  .setDescription('Project Rest Api with Postgres Streaming Replication')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Permissions')
  .addTag('Roles')
  .addTag('Users')
  .addTag('Health')
  .addBearerAuth()
  .build();

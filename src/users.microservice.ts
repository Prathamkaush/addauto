import { NestFactory } from '@nestjs/core';
import { UsersServiceModule } from './users-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersServiceModule);
  app.enableCors();
  
  await app.listen(3002);
  console.log('Users microservice listening on http://localhost:3002');
}

bootstrap();

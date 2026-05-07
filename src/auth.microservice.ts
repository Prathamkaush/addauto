import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  app.enableCors();
  
  await app.listen(3005);
  console.log('Auth microservice listening on http://localhost:3005');
}

bootstrap();

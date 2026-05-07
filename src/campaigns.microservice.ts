import { NestFactory } from '@nestjs/core';
import { CampaignsServiceModule } from './campaigns-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CampaignsServiceModule);
  app.enableCors();
  await app.listen(3004);
  console.log('Campaigns microservice listening on http://localhost:3004');
}

bootstrap();

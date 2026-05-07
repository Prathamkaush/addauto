import { NestFactory } from '@nestjs/core';
import { AdvertisersServiceModule } from './advertisers-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AdvertisersServiceModule);
  app.enableCors();

  await app.listen(3003);
  console.log('Advertisers microservice listening on http://localhost:3003');
}

bootstrap();

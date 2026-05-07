import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisersModule } from './advertisers/advertisers.module';
import { databaseConfig } from './db.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), AdvertisersModule],
})
export class AdvertisersServiceModule {}

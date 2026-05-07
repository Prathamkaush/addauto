import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsModule } from './campaigns/campaigns.module';
import { databaseConfig } from './db.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), CampaignsModule],
})
export class CampaignsServiceModule {}

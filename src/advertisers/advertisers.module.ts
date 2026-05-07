import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisersController } from './advertisers.controller';
import { AdvertisersService } from './advertisers.service';
import { Advertiser } from './entities/advertiser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advertiser])],
  controllers: [AdvertisersController],
  providers: [AdvertisersService],
})
export class AdvertisersModule {}

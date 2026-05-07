import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdvertisersService } from './advertisers.service';
import { CreateAdvertiserDto } from './dtos/create-advertiser.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('advertisers')
export class AdvertisersController {
  constructor(private readonly advertisersService: AdvertisersService) {}

  @Post()
  create(@Body() payload: CreateAdvertiserDto) {
    return this.advertisersService.create(payload);
  }

  @Get()
  findAll() {
    return this.advertisersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertisersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: Partial<CreateAdvertiserDto>) {
    return this.advertisersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertisersService.remove(id);
  }
}

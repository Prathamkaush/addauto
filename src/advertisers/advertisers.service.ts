import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdvertiserDto } from './dtos/create-advertiser.dto';
import { Advertiser } from './entities/advertiser.entity';

@Injectable()
export class AdvertisersService {
  constructor(
    @InjectRepository(Advertiser)
    private readonly advertiserRepository: Repository<Advertiser>,
  ) {}

  create(payload: CreateAdvertiserDto) {
    const advertiser = this.advertiserRepository.create(payload);
    return this.advertiserRepository.save(advertiser);
  }

  findAll() {
    return this.advertiserRepository.find();
  }

  async findOne(id: string) {
    const advertiser = await this.advertiserRepository.findOne({ where: { id } });
    if (!advertiser) {
      throw new NotFoundException('Advertiser not found');
    }
    return advertiser;
  }

  async update(id: string, payload: Partial<CreateAdvertiserDto>) {
    await this.findOne(id);
    await this.advertiserRepository.update(id, payload);
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.advertiserRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Advertiser not found');
    }
    return { deleted: true };
  }
}

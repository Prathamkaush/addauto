import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignsRepository: Repository<Campaign>,
  ) {}

  create(payload: CreateCampaignDto) {
    const campaign = this.campaignsRepository.create(payload);
    return this.campaignsRepository.save(campaign);
  }

  findAll() {
    return this.campaignsRepository.find();
  }

  async findOne(id: string) {
    const campaign = await this.campaignsRepository.findOne({ where: { id } });
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    return campaign;
  }

  async update(id: string, payload: UpdateCampaignDto) {
    await this.findOne(id);
    await this.campaignsRepository.update(id, payload);
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.campaignsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Campaign not found');
    }
    return { deleted: true };
  }
}

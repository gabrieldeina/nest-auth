import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reset } from './reset.entity';
import { ResetInterface } from './reset.interface';

@Injectable()
export class ResetService {
  constructor(
    @InjectRepository(Reset)
    private readonly resetRepository: Repository<Reset>,
  ) {}

  async create(reset: ResetInterface): Promise<ResetInterface> {
    return await this.resetRepository.save(reset);
  }

  async findOne(condition): Promise<ResetInterface> {
    return await this.resetRepository.findOne(condition);
  }
}

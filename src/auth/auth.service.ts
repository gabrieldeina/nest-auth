import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { UserInterface } from './models/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(user: UserInterface): Promise<UserInterface> {
    return await this.userRepository.save(user);
  }

  async findOneBy(condition): Promise<UserInterface> {
    return await this.userRepository.findOne(condition);
  }

  async update(id: number, data): Promise<any> {
    return await this.userRepository.update(id, data);
  }
}

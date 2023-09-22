import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../entity/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  findOne(id: string) {
    return this.contentRepository.findOne({ where: { id } });
  }

  async findAll(query: { page: number; per_page: number }) {
    const { page = 1, per_page = 10 } = query;
    const [users, total] = await this.contentRepository.findAndCount({
      skip: (page - 1) * per_page,
      take: per_page,
    });
    return { users, total };
  }

  create(content: CreateContentDto) {
    return this.contentRepository.save(content);
  }

  update(id: string, content: UpdateContentDto) {
    return this.contentRepository.update(id, content);
  }

  destroy(id: string) {
    return this.contentRepository.delete(id);
  }
}

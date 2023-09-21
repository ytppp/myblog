import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  create(content: CreateContentDto) {
    return this.contentRepository.save(content);
  }
}

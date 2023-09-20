import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Content } from './content.pg.entity';

@Injectable()
export class ContentService {
  constructor(
    @Inject('Content_REPOSITORY')
    private contentRepository: Repository<Content>
  ) { }

  createOrSave(content) {
   return this.contentRepository.save(content)
  }
}
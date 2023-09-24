import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  findOne(id: string) {
    return this.postRepository.findOne({ where: { id } });
  }

  async findAll(query: { page: number; per_page: number }) {
    const { page = 1, per_page = 10 } = query;
    const [posts, total] = await this.postRepository.findAndCount({
      skip: (page - 1) * per_page,
      take: per_page,
    });
    return { posts, total };
  }

  create(post: CreatePostDto) {
    return this.postRepository.save(post);
  }

  update(id: string, post: UpdatePostDto) {
    return this.postRepository.update(id, post);
  }

  destroy(id: string) {
    return this.postRepository.delete(id);
  }
}

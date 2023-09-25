import { Injectable } from '@nestjs/common';
import { Post } from '../entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(post: CreatePostDto) {
    return this.prisma.create(post);
  }

  // async findAll(query: { page: number; per_page: number }) {
  //   const { page = 1, per_page = 10 } = query;
  //   const [posts, total] = await this.postRepository.findAndCount({
  //     skip: (page - 1) * per_page,
  //     take: per_page,
  //   });
  //   return { posts, total };
  // }

  // findOne(id: string) {
  //   return this.postRepository.findOne({ where: { id } });
  // }

  // update(id: string, post: UpdatePostDto) {
  //   return this.postRepository.update(id, post);
  // }

  // destroy(id: string) {
  //   return this.postRepository.delete(id);
  // }
}

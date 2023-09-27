import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'nestjs-prisma';
import { BusinessException } from '@/common/exceptions/business.exception';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return await this.prisma.post.create({ data: createPostDto });
    // try {
    //   return await this.prisma.post.create({ data: createPostDto });
    // } catch (error) {
    //   throw new BusinessException({
    //     code: error.code,
    //     message: error.message,
    //   });
    // }
  }

  async findAll(query: { page: number; per_page: number }) {
    const { page, per_page } = query;
    const posts = await this.prisma.post.findMany({
      skip: (page - 1) * per_page,
      take: per_page,
    });
    const total = await this.prisma.post.count();
    return {
      posts: posts,
      total,
    };
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  remove(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}

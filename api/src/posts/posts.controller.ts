import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  VERSION_NEUTRAL,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Controller({
  path: 'posts',
  version: [VERSION_NEUTRAL, '1'],
})
@ApiTags('内容管理')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @ApiOperation({
    summary: '增加内容',
  })
  @ApiCreatedResponse({ type: PostEntity })
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return new PostEntity(await this.service.create(createPostDto));
  }

  @ApiOperation({
    summary: '获取内容列表',
  })
  @ApiOkResponse({ type: PostEntity, isArray: true })
  @UsePipes(ParseIntPipe)
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
  ) {
    const { posts, total } = await this.service.findAll({
      page,
      per_page,
    });
    return {
      posts: posts.map((post) => new PostEntity(post)),
      total,
    };
  }

  @ApiOperation({
    summary: '获取内容详情',
  })
  @ApiOkResponse({ type: PostEntity })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new PostEntity(await this.service.findOne(id));
  }

  @ApiOperation({
    summary: '修改内容',
  })
  @ApiOkResponse({ type: PostEntity })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return new PostEntity(await this.service.update(id, updatePostDto));
  }

  @ApiOperation({
    summary: '删除内容',
  })
  @ApiOkResponse({ type: PostEntity })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new PostEntity(await this.service.remove(id));
  }

  @Get('findError')
  findError() {
    const a: any = {};
    console.log(a.b.c);
    return '1231';
  }
}

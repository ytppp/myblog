import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller({
  path: 'posts',
  version: [VERSION_NEUTRAL, '1'],
})
@ApiTags('内容管理')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: '增加内容',
  })
  @Post()
  create(@Body() post: CreatePostDto) {
    return this.postsService.create(post);
  }

  @ApiOperation({
    summary: '获取内容列表',
  })
  @Get()
  index(@Query() query: { page: number; per_page: number }) {
    return this.postsService.findAll(query);
  }

  @ApiOperation({
    summary: '获取内容详情',
  })
  @Get(':id')
  show(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({
    summary: '修改内容',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.update(id, post);
  }

  @ApiOperation({
    summary: '删除内容',
  })
  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.postsService.destroy(id);
  }
}

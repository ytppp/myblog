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
  create(@Body() createPostDto: CreatePostDto) {
    return this.service.create(createPostDto);
  }

  @ApiOperation({
    summary: '获取内容列表',
  })
  @ApiOkResponse({ type: PostEntity, isArray: true })
  @UsePipes(ParseIntPipe)
  @Get()
  findAll(@Query('page') page: number, @Query('per_page') per_page: number) {
    return this.service.findAll({
      page,
      per_page,
    });
  }

  @ApiOperation({
    summary: '获取内容详情',
  })
  @ApiOkResponse({ type: PostEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOperation({
    summary: '修改内容',
  })
  @ApiOkResponse({ type: PostEntity })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.service.update(id, updatePostDto);
  }

  @ApiOperation({
    summary: '删除内容',
  })
  @ApiOkResponse({ type: PostEntity })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

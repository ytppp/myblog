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
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller({
  path: 'contents',
  version: [VERSION_NEUTRAL, '1'],
})
@ApiTags('内容管理')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @ApiOperation({
    summary: '获取内容列表',
  })
  @Get()
  index(@Query() query: { page: number; per_page: number }) {
    return this.contentsService.findAll(query);
  }

  @ApiOperation({
    summary: '获取内容详情',
  })
  @Get(':id')
  show(@Param('id') id: string) {
    return this.contentsService.findOne(id);
  }

  @ApiOperation({
    summary: '增加内容',
  })
  @Post()
  create(@Body() content: CreateContentDto) {
    return this.contentsService.create(content);
  }

  @ApiOperation({
    summary: '修改内容',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() content: UpdateContentDto) {
    return this.contentsService.update(id, content);
  }

  @ApiOperation({
    summary: '删除内容',
  })
  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.contentsService.destroy(id);
  }
}

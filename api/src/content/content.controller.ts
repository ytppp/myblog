import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';

@Controller({
  path: 'content',
  version: [VERSION_NEUTRAL, '1'],
})
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @ApiOperation({
    summary: '增加内容',
  })
  @Post()
  create(@Body() content: CreateContentDto) {
    return this.contentService.create(content);
  }
}

import { Body, Controller, Get, Post, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ContentService } from './content.service';
import { AddContentDto } from './content.dto';

@Controller({
  path: 'content',
  version: [VERSION_NEUTRAL, '1'],
})
export class ContentController {
  constructor(
    private readonly configService: ConfigService,
    private readonly contentService: ContentService,
  ) {}

  @Get()
  getHello(): string {
    return 'hello, world';
  }

  @Get('findError')
  findError() {
    const a: any = {};
    console.log(a.b.c);
    return '123';
  }

  @Get('findBusinessError')
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }
    return '456';
  }
  @Get('getTestName')
  getTestName() {
    return this.configService.get('TEST_VALUE').name;
  }

  @ApiOperation({
    summary: '新增内容',
  })
  @Post('/add')
  create(@Body() content: AddContentDto) {
    return this.contentService.createOrSave(content);
  }
}

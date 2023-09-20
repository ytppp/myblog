import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BusinessException } from 'src/common/exceptions/business.exception';

@Controller({
  path: 'contents',
  version: [VERSION_NEUTRAL, '1'],
})
export class ContentsController {
  constructor(private readonly configService: ConfigService) {}

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
}

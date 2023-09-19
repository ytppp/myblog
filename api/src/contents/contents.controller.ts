import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';

@Controller({
  path: 'contents',
  version: [VERSION_NEUTRAL, '1']
})
export class ContentsController {
  @Get()
  getHello():string {
    return 'hello, world'
  }

  @Get('findError')
  findError() {
    const a: any = {}
    console.log(a.b.c)
    return '123';
  }
}

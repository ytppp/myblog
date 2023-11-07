import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';

@Controller({
  path: 'auths',
  version: [VERSION_NEUTRAL, '1'],
})
@ApiTags('权限管理')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({
    summary: '登录',
  })
  @ApiCreatedResponse({ type: AuthEntity })
  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return await this.service.login(email, password);
  }
}

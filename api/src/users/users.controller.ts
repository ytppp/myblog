import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
  UsePipes,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller({
  path: 'users',
  version: [VERSION_NEUTRAL, '1'],
})
@ApiTags('用户管理')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({
    summary: '增加用户',
  })
  @ApiCreatedResponse({ type: UserEntity })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.service.create(createUserDto));
  }

  @ApiOperation({
    summary: '获取用户列表',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @UsePipes(ParseIntPipe)
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
  ) {
    const { users, total } = await this.service.findAll({
      page,
      per_page,
    });
    return {
      users: users.map((user) => new UserEntity(user)),
      total,
    };
  }

  @ApiOperation({
    summary: '获取用户',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new UserEntity(await this.service.findOne(id));
  }

  @ApiOperation({
    summary: '修改用户',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.service.update(id, updateUserDto));
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new UserEntity(await this.service.remove(id));
  }
}

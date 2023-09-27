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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

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
  create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }

  @ApiOperation({
    summary: '获取内容列表',
  })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @UsePipes(ParseIntPipe)
  @Get()
  findAll(@Query('page') page: number, @Query('per_page') per_page: number) {
    return this.service.findAll({
      page,
      per_page,
    });
  }

  @ApiOperation({
    summary: '获取用户',
  })
  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOperation({
    summary: '修改用户',
  })
  @ApiOkResponse({ type: UserEntity })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.service.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @ApiOkResponse({ type: UserEntity })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller({
  path: 'categories',
  version: [VERSION_NEUTRAL, '1'],
})
@ApiTags('栏目管理')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @ApiOperation({
    summary: '增加栏目',
  })
  @ApiCreatedResponse({ type: CategoryEntity })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.service.create(createCategoryDto);
  }

  @ApiOperation({
    summary: '获取栏目列表',
  })
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({
    summary: '获取栏目详情',
  })
  @ApiOkResponse({ type: CategoryEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOperation({
    summary: '修改栏目',
  })
  @ApiOkResponse({ type: CategoryEntity })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.service.update(id, updateCategoryDto);
  }

  @ApiOperation({
    summary: '删除栏目',
  })
  @ApiOkResponse({ type: CategoryEntity })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

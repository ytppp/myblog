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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller({
  path: 'categories',
  version: [VERSION_NEUTRAL, '1'],
})
@ApiTags('栏目管理')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @ApiOperation({
    summary: '获取栏目列表',
  })
  @Get()
  index() {
    return this.service.findAll();
  }

  @ApiOperation({
    summary: '获取栏目详情',
  })
  @Get(':id')
  show(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOperation({
    summary: '增加栏目',
  })
  @Post()
  create(@Body() data: any) {
    const category: CreateCategoryDto = {
      name: data.name,
    };
    return this.service.create(category, data.parent_id);
  }

  @ApiOperation({
    summary: '修改栏目',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    const category: UpdateCategoryDto = {
      name: data.name,
    };
    return this.service.update(id, category, data.parent_id);
  }

  @ApiOperation({
    summary: '删除栏目',
  })
  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.service.destroy(id);
  }
}

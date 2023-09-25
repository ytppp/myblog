import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Category } from '../../entity/category.entity';

export class CreateCategoryDto {
  @ApiProperty({ example: '首页' })
  @IsNotEmpty({ message: '栏目名不能为空' })
  name: string;

  parent?: Category;
}

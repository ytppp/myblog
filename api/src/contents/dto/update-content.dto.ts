import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateContentDto {
  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;

  @ApiProperty({ example: '内容' })
  @IsNotEmpty({ message: '内容不能为空' })
  text: string;
}

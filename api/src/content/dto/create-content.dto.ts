import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateContentDto {
  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  title: string;
}

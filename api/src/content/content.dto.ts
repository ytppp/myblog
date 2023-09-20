import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddContentDto {
  
  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  title: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
  constructor(partial: Partial<CategoryEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

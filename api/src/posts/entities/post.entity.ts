import { CategoryEntity } from '@/categories/entities/category.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class PostEntity implements Post {
  constructor({ user, category, ...data }: Partial<PostEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
    if (category) {
      this.category = new CategoryEntity(category);
    }
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @Exclude()
  category_id: string | null;

  @Exclude()
  user_id: string | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ required: false, type: UserEntity })
  user?: UserEntity;

  @ApiProperty({ required: false, type: CategoryEntity })
  category?: CategoryEntity;
}

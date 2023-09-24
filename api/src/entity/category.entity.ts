import {
  Entity,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
  OneToMany,
} from 'typeorm';
import { CommonEntity } from './common-entity.entity';
import { Post } from './post.entity';

@Entity()
@Tree('closure-table')
export class Category extends CommonEntity {
  @Column({ default: null, length: 100, unique: true })
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}

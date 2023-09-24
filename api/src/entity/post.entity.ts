import { Entity, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from './common-entity.entity';
import { Category } from './category.entity';

@Entity()
export class Post extends CommonEntity {
  @Column({ default: null, length: 100, unique: true })
  title: string;

  @Column({ type: 'text', default: null })
  text: string;

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category[];
}

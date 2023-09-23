import { Entity, Column, Tree, TreeChildren, TreeParent } from 'typeorm';
import { CommonEntity } from './common-entity.entity';

@Entity()
@Tree('closure-table')
export class Category extends CommonEntity {
  @Column({ default: null, length: 100, unique: true })
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}

import { Entity, Column } from 'typeorm';
import { CommonEntity } from './common-entity.entity';

@Entity()
export class Content extends CommonEntity {
  @Column({ default: null, length: 100, unique: true })
  title: string;

  @Column({ type: 'text', default: null })
  text: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: null })
  title: string;
}

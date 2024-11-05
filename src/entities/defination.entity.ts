import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { Words } from '@/src/entities/words.entity';

@Entity()
export class Defination extends BaseModel {
  @Column({ type: 'text' })
  defination: string;

  @ManyToOne(() => Words, (word) => word.definitions)
  words: Words;
}

import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { Words } from '@/src/entities/words.entity';
import { PartOfSpeech } from '@/src/entities/part-of-speach.entity';

@Entity()
export class Examples extends BaseModel {
  @Column({ type: 'text' })
  example: string;

  @ManyToOne(() => Words, (word) => word.examples, { onDelete: 'CASCADE' })
  word: Words;

  @ManyToOne(() => PartOfSpeech)
  partOfSpeech: PartOfSpeech;
}

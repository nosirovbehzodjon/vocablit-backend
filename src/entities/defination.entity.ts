import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { Words } from '@/src/entities/words.entity';
import { PartOfSpeech } from '@/src/entities/part-of-speech.entity';

@Entity()
export class Defination extends BaseModel {
  @Column({ type: 'text' })
  defination: string;

  @ManyToOne(() => Words, (word) => word.defination)
  words: Words;

  @ManyToOne(() => PartOfSpeech, (word) => word.defination)
  part_of_speech: PartOfSpeech;
}

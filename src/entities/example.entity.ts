import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { Words } from '@/src/entities/words.entity';
// import { PartOfSpeech } from '@/src/entities/part-of-speech.entity';

@Entity()
export class Example extends BaseModel {
  @Column({ type: 'text' })
  example: string;

  @ManyToOne(() => Words, (word) => word.example, { onDelete: 'CASCADE' })
  words: Words;

  //   @ManyToOne(() => PartOfSpeech, (word) => word.example)
  //   part_of_speech: PartOfSpeech;
}

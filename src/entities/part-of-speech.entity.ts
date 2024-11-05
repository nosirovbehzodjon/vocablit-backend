import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { Words } from '@/src/entities/words.entity';

@Entity()
export class PartOfSpeech extends BaseModel {
  @Column({ type: 'text', unique: true })
  speech: string;

  @ManyToMany(() => Words, (word) => word.part_of_speech)
  words: Words[];
}

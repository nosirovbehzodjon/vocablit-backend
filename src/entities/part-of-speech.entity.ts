import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { Words } from '@/src/entities/words.entity';
import { Defination } from '@/src/entities/defination.entity';

@Entity()
export class PartOfSpeech extends BaseModel {
  @Column({ type: 'text', unique: true })
  speech: string;

  @ManyToMany(() => Words, (word) => word.part_of_speech)
  words: Words[];

  @OneToMany(() => Defination, (definition) => definition.part_of_speech, {
    cascade: true,
  })
  defination: Defination[];
}

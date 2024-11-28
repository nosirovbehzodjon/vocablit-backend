import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';
import { PartOfSpeech } from '@/src/entities/part-of-speech.entity';
import { Defination } from '@/src/entities/defination.entity';
import { Example } from '@/src/entities/example.entity';
// import { Defination } from '@/src/entities/defination.entity';
// import { Examples } from '@/src/entities/example.entity';

@Entity()
export class Words extends BaseModel {
  @Column({ unique: true, type: 'varchar', length: 40 })
  word: string;

  @ManyToMany(
    () => DifficultyLevel,
    (difficultyLevel) => difficultyLevel.words,
    {
      nullable: false,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinTable({ name: 'words_difficulty_level' })
  difficulty_level?: DifficultyLevel[];

  @ManyToMany(() => PartOfSpeech, (partOfSpeech) => partOfSpeech.words, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'words_part_of_speech' })
  part_of_speech?: PartOfSpeech[];

  @OneToMany(() => Defination, (definition) => definition.words, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  defination?: Defination[];

  @OneToMany(() => Example, (example) => example.words, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  example?: Example[];
}

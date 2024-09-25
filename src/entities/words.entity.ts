import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';
// import { PartOfSpeech } from '@/src/entities/part-of-speach.entity';
// import { Defination } from '@/src/entities/defination.entity';
// import { Examples } from '@/src/entities/example.entity';

@Entity()
export class Words extends BaseModel {
  @Column({ unique: true, type: 'varchar', length: 40 })
  word: string;

  part_of_speech: string;

  @ManyToMany(
    () => DifficultyLevel,
    (difficultyLevel) => difficultyLevel.words,
    {
      nullable: false,
      cascade: true,
    },
  )
  @JoinTable({ name: 'words_difficulty_level' })
  difficulty_level: DifficultyLevel[];

  // @ManyToOne(() => PartOfSpeech, { nullable: false, cascade: true })
  // @JoinColumn({ name: 'part_of_speech_id' })
  // part_of_speech: PartOfSpeech;

  // @ManyToOne(() => DifficultyLevel, { nullable: false, cascade: true })
  // @JoinColumn({ name: 'difficulty_level_id' })
  // difficulty_level: DifficultyLevel;

  // @OneToMany(() => Defination, (definition) => definition.word, {
  //   cascade: true,
  // })
  // definitions: Defination;

  // @OneToMany(() => Examples, (example) => example.word, {
  //   cascade: true,
  // })
  // examples: Examples[];
}

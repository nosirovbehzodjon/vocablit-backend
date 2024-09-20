import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { PartOfSpeech } from '@/src/entities/part-of-speach.entity';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';
import { Defination } from '@/src/entities/defination.entity';
import { Examples } from '@/src/entities/example.entity';

@Entity()
export class Words extends BaseModel {
  @Column({ unique: true, type: 'string', length: 40 })
  word: string;

  @ManyToOne(() => PartOfSpeech)
  partOfSpeech: PartOfSpeech;

  @ManyToOne(() => DifficultyLevel)
  difficultyLevel: DifficultyLevel;

  @OneToMany(() => Defination, (definition) => definition.word, {
    cascade: true,
    nullable: true,
  })
  definitions: Defination;

  @OneToMany(() => Examples, (example) => example.word, {
    cascade: true,
    nullable: true,
  })
  examples: Examples[];
}

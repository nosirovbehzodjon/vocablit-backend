import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { Words } from './words.entity';

@Entity()
export class DifficultyLevel extends BaseModel {
  @Column({ type: 'text', unique: true })
  level: string;

  @ManyToMany(() => Words, (word) => word.difficulty_level)
  words: Words[];

  // @OneToMany(() => Defination, (definition) => definition.difficultyLevel, {
  //   nullable: true,
  // })
  // definitions: Defination[];

  // @OneToMany(() => Examples, (example) => example.difficultyLevel, {
  //   nullable: true,
  // })
  // examples: Examples[];
}

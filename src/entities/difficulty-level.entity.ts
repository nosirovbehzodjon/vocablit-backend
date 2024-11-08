import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { Words } from '@/src/entities/words.entity';

@Entity()
export class DifficultyLevel extends BaseModel {
  @Column({ type: 'text', unique: true })
  level: string;

  @ManyToMany(() => Words, (word) => word.difficulty_level)
  words: Words[];
}

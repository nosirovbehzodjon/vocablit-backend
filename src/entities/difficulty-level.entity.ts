import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { Defination } from '@/src/entities/defination.entity';
import { Examples } from '@/src/entities/example.entity';

@Entity()
export class DifficultyLevel extends BaseModel {
  @Column({ type: 'text', unique: true })
  level: string;

  //   @OneToMany(() => Word, (word) => word.difficultyLevel)
  //   words: Word[];

  @OneToMany(() => Defination, (definition) => definition.difficultyLevel, {
    nullable: true,
  })
  definitions: Defination[];

  @OneToMany(() => Examples, (example) => example.difficultyLevel, {
    nullable: true,
  })
  examples: Examples[];
}

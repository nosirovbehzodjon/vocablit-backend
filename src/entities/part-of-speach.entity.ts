import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';

@Entity()
export class PartOfSpeech extends BaseModel {
  @Column({ unique: true, type: 'string', length: 40 })
  type: string; // e.g., noun, verb, adjective, etc.

  @OneToMany(() => Definition, (definition) => definition.partOfSpeech, {
    nullable: true,
  })
  definitions: Definition[];

  @OneToMany(() => Example, (example) => example.partOfSpeech, {
    nullable: true,
  })
  examples: Example[];
}

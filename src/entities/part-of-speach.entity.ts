// import { Column, Entity, OneToMany } from 'typeorm';
// import { BaseModel } from '@/src/entities/base.entity';
// import { Defination } from './defination.entity';
// import { Examples } from './example.entity';

// @Entity()
// export class PartOfSpeech extends BaseModel {
//   @Column({ unique: true, type: 'string', length: 40 })
//   type: string; // e.g., noun, verb, adjective, etc.

//   @OneToMany(() => Defination, (definition) => definition.partOfSpeech, {
//     nullable: true,
//   })
//   definitions: Defination[];

//   @OneToMany(() => Examples, (example) => example.partOfSpeech, {
//     nullable: true,
//   })
//   examples: Examples[];
// }

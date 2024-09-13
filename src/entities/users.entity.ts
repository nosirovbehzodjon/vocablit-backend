import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { UserVocabulary } from './user_vocabulary.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'student' })
  role: string;

  //   @OneToMany(() => UserVocabulary, userVocabulary => userVocabulary.user)
  //   userVocabulary: UserVocabulary[];
}

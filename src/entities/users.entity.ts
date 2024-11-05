import { IsEmail, IsIn, IsNumber, IsString, Length } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from '@/src/entities/base.entity';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';
// import { UserVocabulary } from './user_vocabulary.entity';

@Entity()
export class User extends BaseModel {
  @Column({ unique: true })
  username: string;

  @Column()
  @IsString()
  @Length(2)
  first_name: string;

  @Column()
  @Length(6)
  password: string;

  @ManyToOne(() => DifficultyLevel, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'learning_level_id' })
  learning_level: DifficultyLevel;

  @Column({ default: 0 })
  @IsNumber()
  xp: number;

  @Column({ nullable: true, type: 'varchar' })
  avatar: string;

  @Column({ nullable: true })
  @IsString()
  last_name: string;

  @Column({ unique: true, nullable: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ nullable: true })
  @IsIn(['male', 'female'])
  gender: string;

  @Column({ nullable: true })
  native_language: string;

  @Column({ nullable: true })
  country: string;

  @Column({ default: 'student' })
  @IsIn(['student', 'admin', 'super_admin'])
  role: string;

  //   @OneToMany(() => UserVocabulary, userVocabulary => userVocabulary.user)
  //   userVocabulary: UserVocabulary[];
}

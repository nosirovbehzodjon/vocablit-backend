import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Words } from '@/src/entities/words.entity';
import { WordsController } from '@/src/modules/words/words.controller';
import { WordsService } from '@/src/modules/words/words.service';
import { UniqueWordValidator } from '@/src/modules/words/validation/word.service';
import { DifficultyLevelService } from '@/src/modules/difficulty/diffuculty.service';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Words, DifficultyLevel])],
  controllers: [WordsController],
  providers: [WordsService, DifficultyLevelService, UniqueWordValidator],
})
export class WordsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Words } from '@/src/entities/words.entity';
import { WordsController } from '@/src/modules/words/words.controller';
import { WordsService } from '@/src/modules/words/words.service';
import { UniqueWordValidator } from '@/src/modules/words/validation/word.service';
import { DifficultyLevelService } from '@/src/modules/difficulty/diffuculty.service';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';
import { PartOfSpeechService } from '@/src/modules/part-of-speech/part-of-speech.service';
import { PartOfSpeech } from '@/src/entities/part-of-speech.entity';
import { DefinationService } from '@/src/modules/definations/defination.service';
import { Defination } from '@/src/entities/defination.entity';
import { Example } from '@/src/entities/example.entity';
import { ExampleService } from '@/src/modules/example/example.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Words,
      DifficultyLevel,
      PartOfSpeech,
      Defination,
      Example,
    ]),
  ],
  controllers: [WordsController],
  providers: [
    WordsService,
    DifficultyLevelService,
    PartOfSpeechService,
    DefinationService,
    ExampleService,
    UniqueWordValidator,
  ],
})
export class WordsModule {}

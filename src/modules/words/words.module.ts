import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Words } from '@/src/entities/words.entity';
import { WordsController } from '@/src/modules/words/words.controller';
import { WordsService } from '@/src/modules/words/words.service';
import { UniqueWordValidator } from '@/src/modules/words/validation/word.service';

@Module({
  imports: [TypeOrmModule.forFeature([Words])],
  controllers: [WordsController],
  providers: [WordsService, UniqueWordValidator],
})
export class WordsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueLevelValidator } from '@/src/modules/part-of-speech/validation/part-of-speech.service';
import { PartOfSpeechService } from '@/src/modules/part-of-speech/part-of-speech.service';
import { PartOfSpeechController } from '@/src/modules/part-of-speech/part-of-speech.controller';
import { PartOfSpeech } from '@/src/entities/part-of-speech.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartOfSpeech])],
  controllers: [PartOfSpeechController],
  providers: [PartOfSpeechService, UniqueLevelValidator],
})
export class PartOfSpeechModule {}

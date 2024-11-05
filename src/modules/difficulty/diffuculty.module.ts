import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueLevelValidator } from '@/src/modules/difficulty/validation/level.service';
import { DifficultyLevelService } from '@/src/modules/difficulty/diffuculty.service';
import { DifficultyLevelController } from '@/src/modules/difficulty/diffuculty.controller';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DifficultyLevel])],
  controllers: [DifficultyLevelController],
  providers: [DifficultyLevelService, UniqueLevelValidator],
})
export class DifficultyLevelModule {}

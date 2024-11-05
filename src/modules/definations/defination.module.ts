import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefinationService } from '@/src/modules/definations/defination.service';
import { DefinationController } from '@/src/modules/definations/defination.controller';
import { Defination } from '@/src/entities/defination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Defination])],
  controllers: [DefinationController],
  providers: [DefinationService],
})
export class DefinationModule {}

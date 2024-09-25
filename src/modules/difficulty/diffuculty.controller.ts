import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LIMIT, PAGE } from '@/src/constants/common.constant';
import {
  IDeleteResponseData,
  IPaginationResponseData,
} from '@/src/types/common.types';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';
import {
  CreateDifficultyLevelDto,
  DifficultyLevelDeleteParamDto,
  DifficultyLevelDetailsParamDto,
  DifficultyLevelUpdateParamDto,
  UpdateDifficultyLevelDto,
} from '@/src/modules/difficulty/dto/difficulty.dto';
import { DifficultyLevelService } from '@/src/modules/difficulty/diffuculty.service';

@Controller('difficulty-level')
export class DifficultyLevelController {
  constructor(
    private readonly difficultyLevelService: DifficultyLevelService,
  ) {}
  //----difficulty-level-list------------------------------------------
  @Get()
  async list(
    @Query('page') page: string = PAGE,
    @Query('limit') limit: string = LIMIT,
  ): Promise<IPaginationResponseData<DifficultyLevel>> {
    try {
      return this.difficultyLevelService.list(Number(page), Number(limit));
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  //----difficulty-level-details------------------------------------------
  @Get(':id')
  async details(
    @Param() params: DifficultyLevelDetailsParamDto,
  ): Promise<DifficultyLevel> {
    try {
      return this.difficultyLevelService.details(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----difficulty-level-create------------------------------------------
  @Post()
  async create(@Body() body: CreateDifficultyLevelDto) {
    try {
      return this.difficultyLevelService.create(body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----difficulty-level-update------------------------------------------
  @Patch(':id')
  async update(
    @Param() params: DifficultyLevelUpdateParamDto,
    @Body() body: UpdateDifficultyLevelDto,
  ) {
    try {
      return this.difficultyLevelService.update(params.id, body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----difficulty-level-delete------------------------------------------
  @Delete(':id')
  async delete(
    @Param() params: DifficultyLevelDeleteParamDto,
  ): Promise<IDeleteResponseData> {
    try {
      return this.difficultyLevelService.delete(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

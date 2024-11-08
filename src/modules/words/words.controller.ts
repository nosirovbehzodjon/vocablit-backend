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
import { IdentifyParamDto, LIMIT, PAGE } from '@/src/constants/common.constant';
import {
  IDeleteResponseData,
  IPaginationResponseData,
} from '@/src/types/common.types';
import { Words } from '@/src/entities/words.entity';
import {
  AddNewDefinationDto,
  AddNewPartOfSpeechDto,
  CreateWordDto,
  UpdateWordDto,
} from '@/src/modules/words/dto/words.dto';
import { WordsService } from '@/src/modules/words/words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}
  //----word-list------------------------------------------
  @Get()
  async list(
    @Query('page') page: string = PAGE,
    @Query('limit') limit: string = LIMIT,
  ): Promise<IPaginationResponseData<Words>> {
    try {
      return this.wordsService.list(Number(page), Number(limit));
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  //----word-details------------------------------------------
  @Get(':id')
  async details(@Param() params: IdentifyParamDto): Promise<Words> {
    try {
      return this.wordsService.details(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----words-create------------------------------------------
  @Post()
  async create(@Body() body: CreateWordDto) {
    try {
      return this.wordsService.create(body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----words-update------------------------------------------
  @Patch(':id')
  async update(@Param() params: IdentifyParamDto, @Body() body: UpdateWordDto) {
    try {
      return this.wordsService.update(params.id, body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----words-delete------------------------------------------
  @Delete(':id')
  async delete(
    @Param() params: IdentifyParamDto,
  ): Promise<IDeleteResponseData> {
    try {
      return this.wordsService.delete(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----adding-defination------------------------------------------

  @Patch('defination/:id')
  async defination(
    @Param() params: IdentifyParamDto,
    @Body() body: AddNewDefinationDto,
  ) {
    try {
      return this.wordsService.addWordDefination(params.id, body.defination);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----adding-defination------------------------------------------

  @Patch('speech/:id')
  async speech(
    @Param() params: IdentifyParamDto,
    @Body() body: AddNewPartOfSpeechDto,
  ) {
    try {
      return this.wordsService.addWordPartOfSpeech(params.id, body.speech);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

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
import { PartOfSpeech } from '@/src/entities/part-of-speech.entity';
import {
  CreatePartOfSpeechDto,
  UpdatePartOfSpeechDto,
} from '@/src/modules/part-of-speech/dto/part-of-speech.dto';
import { PartOfSpeechService } from '@/src/modules/part-of-speech/part-of-speech.service';

@Controller('part-of-speech')
export class PartOfSpeechController {
  constructor(private readonly PartOfSpeechService: PartOfSpeechService) {}
  //----part-of-speech-list------------------------------------------
  @Get()
  async list(
    @Query('page') page: string = PAGE,
    @Query('limit') limit: string = LIMIT,
  ): Promise<IPaginationResponseData<PartOfSpeech>> {
    try {
      return this.PartOfSpeechService.list(Number(page), Number(limit));
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  //----part-of-speech-details------------------------------------------
  @Get(':id')
  async details(@Param() params: IdentifyParamDto): Promise<PartOfSpeech> {
    try {
      return this.PartOfSpeechService.details(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----part-of-speech-create------------------------------------------
  @Post()
  async create(@Body() body: CreatePartOfSpeechDto) {
    try {
      return this.PartOfSpeechService.create(body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----part-of-speech-update------------------------------------------
  @Patch(':id')
  async update(
    @Param() params: IdentifyParamDto,
    @Body() body: UpdatePartOfSpeechDto,
  ) {
    try {
      return this.PartOfSpeechService.update(params.id, body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----part-of-speech-delete------------------------------------------
  @Delete(':id')
  async delete(
    @Param() params: IdentifyParamDto,
  ): Promise<IDeleteResponseData> {
    try {
      return this.PartOfSpeechService.delete(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

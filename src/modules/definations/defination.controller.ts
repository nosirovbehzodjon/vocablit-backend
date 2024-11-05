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
import { Defination } from '@/src/entities/defination.entity';
import {
  CreateDefinationDto,
  UpdateDefinationDto,
} from '@/src/modules/definations/dto/defination.dto';
import { DefinationService } from '@/src/modules/definations/defination.service';

@Controller('definations')
export class DefinationController {
  constructor(private readonly DefinationService: DefinationService) {}
  //----defination-list------------------------------------------
  @Get()
  async list(
    @Query('page') page: string = PAGE,
    @Query('limit') limit: string = LIMIT,
  ): Promise<IPaginationResponseData<Defination>> {
    try {
      return this.DefinationService.list(Number(page), Number(limit));
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  //----defination-details------------------------------------------
  @Get(':id')
  async details(@Param() params: IdentifyParamDto): Promise<Defination> {
    try {
      return this.DefinationService.details(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----defination-create------------------------------------------
  @Post()
  async create(@Body() body: CreateDefinationDto) {
    try {
      return this.DefinationService.create(body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----defination-update------------------------------------------
  @Patch(':id')
  async update(
    @Param() params: IdentifyParamDto,
    @Body() body: UpdateDefinationDto,
  ) {
    try {
      return this.DefinationService.update(params.id, body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----defination-delete------------------------------------------
  @Delete(':id')
  async delete(
    @Param() params: IdentifyParamDto,
  ): Promise<IDeleteResponseData> {
    try {
      return this.DefinationService.delete(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

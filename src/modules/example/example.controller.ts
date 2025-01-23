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
import { Example } from '@/src/entities/example.entity';
import {
  CreateExampleDto,
  UpdateExampleDto,
} from '@/src/modules/example/dto/example.dto';
import { ExampleService } from '@/src/modules/example/example.service';

@Controller('examples')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}
  //----example-list------------------------------------------
  @Get()
  async list(
    @Query('page') page: string = PAGE,
    @Query('limit') limit: string = LIMIT,
  ): Promise<IPaginationResponseData<Example>> {
    try {
      return this.exampleService.list(Number(page), Number(limit));
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  //----example-details------------------------------------------
  @Get(':id')
  async details(@Param() params: IdentifyParamDto): Promise<Example> {
    try {
      return this.exampleService.details(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----example-create------------------------------------------
  @Post()
  async create(@Body() body: CreateExampleDto) {
    try {
      return this.exampleService.create(body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----example-update------------------------------------------
  @Patch(':id')
  async update(
    @Param() params: IdentifyParamDto,
    @Body() body: UpdateExampleDto,
  ) {
    try {
      return this.exampleService.update(params.id, body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----example-delete------------------------------------------
  @Delete(':id')
  async delete(
    @Param() params: IdentifyParamDto,
  ): Promise<IDeleteResponseData> {
    try {
      return this.exampleService.delete(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ICreateResponseData,
  IDeleteResponseData,
  IPaginationResponseData,
} from '@/src/types/common.types';
import { funcPageLimitHandler } from '@/src/helpers/funcPageLimitHandler';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/src/generated/i18n.generated';
import { Example } from '@/src/entities/example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  //----example-list-----------------------------------------
  async list(
    ...rest: [number, number]
  ): Promise<IPaginationResponseData<Example>> {
    try {
      const [page, limit] = funcPageLimitHandler(...rest);
      const [start, end] = [(page - 1) * limit, page * limit];
      const more = end < (await this.exampleRepository.count());

      const qb = this.exampleRepository.createQueryBuilder();

      const [levels, count] = await qb
        .select()
        .offset(start)
        .limit(limit)
        .getManyAndCount();

      return {
        total: count,
        items: limit,
        page,
        more,
        data: levels,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----get-example--------------------------------------------
  async details(id: string): Promise<Example> {
    try {
      const data = await this.exampleRepository.findOne({
        where: { id },
        relations: ['words'],
      });

      if (!data) {
        throw new HttpException(
          this.i18n.translate('common.notFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      return data;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----create-example-----------------------------------------
  async create(
    Example: Partial<Example>,
  ): Promise<ICreateResponseData<Example>> {
    try {
      const newExample = this.exampleRepository.create(Example);
      return {
        statusCode: HttpStatus.CREATED,
        message: await this.i18n.translate('common.successCreateMessage'),
        data: await this.exampleRepository.save(newExample),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----update-example-----------------------------------------
  async update(
    id: string,
    level: Partial<Example>,
  ): Promise<ICreateResponseData<Example>> {
    try {
      await this.exampleRepository.update(id, level);
      return {
        statusCode: HttpStatus.OK,
        message: await this.i18n.translate('common.successUpdateMessage'),
        data: await this.exampleRepository.findOne({ where: { id } }),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----delete-example-details-----------------------------------------
  async delete(id: string): Promise<IDeleteResponseData> {
    try {
      const response = await this.exampleRepository.delete(id);
      if (response.affected === 0) {
        throw new NotFoundException(
          this.i18n.translate('common.notFound', {
            args: { id },
          }),
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: await this.i18n.translate('common.successDeleteMessage'),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

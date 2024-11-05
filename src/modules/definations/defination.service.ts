import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { Defination } from '@/src/entities/defination.entity';

@Injectable()
export class DefinationService {
  constructor(
    @InjectRepository(Defination)
    private definationRepository: Repository<Defination>,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  //----defination-list-----------------------------------------
  async list(
    ...rest: [number, number]
  ): Promise<IPaginationResponseData<Defination>> {
    try {
      const [page, limit] = funcPageLimitHandler(...rest);
      const [start, end] = [(page - 1) * limit, page * limit];
      const more = end < (await this.definationRepository.count());

      const qb = this.definationRepository.createQueryBuilder();

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

  //----get-defination--------------------------------------------
  async details(id: string): Promise<Defination> {
    try {
      const data = await this.definationRepository.findOne({
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

  //----create-defination-----------------------------------------
  async create(
    defination: Partial<Defination>,
  ): Promise<ICreateResponseData<Defination>> {
    try {
      const newdefination = this.definationRepository.create(defination);
      return {
        status: HttpStatus.CREATED,
        message: await this.i18n.translate('common.successCreateMessage'),
        data: await this.definationRepository.save(newdefination),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----update-defination-----------------------------------------
  async update(
    id: string,
    level: Partial<Defination>,
  ): Promise<ICreateResponseData<Defination>> {
    try {
      await this.definationRepository.update(id, level);
      return {
        status: HttpStatus.OK,
        message: await this.i18n.translate('common.successUpdateMessage'),
        data: await this.definationRepository.findOne({ where: { id } }),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----delete-defination-details-----------------------------------------
  async delete(id: string): Promise<IDeleteResponseData> {
    try {
      await this.definationRepository.delete(id);
      return {
        status: HttpStatus.OK,
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

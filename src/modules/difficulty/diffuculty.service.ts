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
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';

@Injectable()
export class DifficultyLevelService {
  constructor(
    @InjectRepository(DifficultyLevel)
    private difficultyLevelRepository: Repository<DifficultyLevel>,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  //----difficulty-level-list-----------------------------------------
  async list(
    ...rest: [number, number]
  ): Promise<IPaginationResponseData<DifficultyLevel>> {
    try {
      const [page, limit] = funcPageLimitHandler(...rest);
      const [start, end] = [(page - 1) * limit, page * limit];
      const more = end < (await this.difficultyLevelRepository.count());

      const qb = this.difficultyLevelRepository.createQueryBuilder();

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

  //----get-difficulty-level--------------------------------------------
  async details(id: string): Promise<DifficultyLevel> {
    try {
      const data = await this.difficultyLevelRepository.findOne({
        where: { id },
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

  //----create-difficulty-level-----------------------------------------
  async create(
    level: Partial<DifficultyLevel>,
  ): Promise<ICreateResponseData<DifficultyLevel>> {
    try {
      const newlevel = this.difficultyLevelRepository.create(level);
      return {
        statusCode: HttpStatus.CREATED,
        message: await this.i18n.translate('common.successCreateMessage'),
        data: await this.difficultyLevelRepository.save(newlevel),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----update-difficulty-level-----------------------------------------
  async update(
    id: string,
    level: Partial<DifficultyLevel>,
  ): Promise<ICreateResponseData<DifficultyLevel>> {
    try {
      await this.difficultyLevelRepository.update(id, level);
      return {
        statusCode: HttpStatus.OK,
        message: await this.i18n.translate('common.successUpdateMessage'),
        data: await this.difficultyLevelRepository.findOne({ where: { id } }),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----delete-difficulty-level-details-----------------------------------------
  async delete(id: string): Promise<IDeleteResponseData> {
    try {
      await this.difficultyLevelRepository.delete(id);
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

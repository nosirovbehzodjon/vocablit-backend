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
import { Words } from '@/src/entities/words.entity';
import { UpdateWordDto } from '@/src/modules/words/dto/words.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Words)
    private wordsRepository: Repository<Words>,
    private i18n: I18nService<I18nTranslations>,
  ) {}
  //----words-list-----------------------------------------
  async list(
    ...rest: [number, number]
  ): Promise<IPaginationResponseData<Words>> {
    try {
      const [page, limit] = funcPageLimitHandler(...rest);
      const [start, end] = [(page - 1) * limit, page * limit];
      const more = end < (await this.wordsRepository.count());

      const qb = this.wordsRepository.createQueryBuilder('words');

      const [words, count] = await qb
        .select()
        .leftJoinAndSelect('words.difficulty_level', 'word_difficulty_level')
        .offset(start)
        .limit(limit)
        .getManyAndCount();

      return {
        total: count,
        items: limit,
        page,
        more,
        data: words,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----get-word-details-----------------------------------------
  async details(id: string): Promise<Words> {
    try {
      return this.wordsRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----create-word-details-----------------------------------------
  async create(level: Partial<Words>): Promise<ICreateResponseData<Words>> {
    try {
      const newlevel = this.wordsRepository.create(level);
      return {
        status: HttpStatus.CREATED,
        message: await this.i18n.translate('common.successCreateMessage'),
        data: await this.wordsRepository.save(newlevel),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----update-word-details-----------------------------------------
  async update(
    id: string,
    level: UpdateWordDto,
  ): Promise<ICreateResponseData<Words>> {
    try {
      await this.wordsRepository.update(id, level);
      return {
        status: HttpStatus.OK,
        message: await this.i18n.translate('common.successUpdateMessage'),
        data: await this.wordsRepository.findOne({ where: { id } }),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----delete-word-details-----------------------------------------
  async delete(id: string): Promise<IDeleteResponseData> {
    try {
      await this.wordsRepository.delete(id);
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

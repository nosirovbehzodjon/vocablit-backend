import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ICreateResponseData,
  IDeleteResponseData,
  IPaginationResponseData,
} from '@/src/types/common.types';
import { funcPageLimitHandler } from '@/src/helpers/funcPageLimitHandler';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/src/generated/i18n.generated';
import { PartOfSpeech } from '@/src/entities/part-of-speech.entity';

@Injectable()
export class PartOfSpeechService {
  constructor(
    @InjectRepository(PartOfSpeech)
    private partOfSpeechRepository: Repository<PartOfSpeech>,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  //----part-of-speech-list-----------------------------------------
  async list(
    ...rest: [number, number]
  ): Promise<IPaginationResponseData<PartOfSpeech>> {
    try {
      const [page, limit] = funcPageLimitHandler(...rest);
      const [start, end] = [(page - 1) * limit, page * limit];
      const more = end < (await this.partOfSpeechRepository.count());

      const qb = this.partOfSpeechRepository.createQueryBuilder();

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

  //----get-part-of-speech--------------------------------------------
  async details(id: string): Promise<PartOfSpeech> {
    try {
      return this.partOfSpeechRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----create-part-of-speech-----------------------------------------
  async create(
    level: Partial<PartOfSpeech>,
  ): Promise<ICreateResponseData<PartOfSpeech>> {
    try {
      const newlevel = this.partOfSpeechRepository.create(level);
      return {
        status: HttpStatus.CREATED,
        message: await this.i18n.translate('common.successCreateMessage'),
        data: await this.partOfSpeechRepository.save(newlevel),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----update-part-of-speech-----------------------------------------
  async update(
    id: string,
    level: Partial<PartOfSpeech>,
  ): Promise<ICreateResponseData<PartOfSpeech>> {
    try {
      await this.partOfSpeechRepository.update(id, level);
      return {
        status: HttpStatus.OK,
        message: await this.i18n.translate('common.successUpdateMessage'),
        data: await this.partOfSpeechRepository.findOne({ where: { id } }),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----delete-part-of-speech-details-----------------------------------------
  async delete(id: string): Promise<IDeleteResponseData> {
    try {
      await this.partOfSpeechRepository.delete(id);
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

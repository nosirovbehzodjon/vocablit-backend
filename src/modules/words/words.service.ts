import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
import { CreateWordDto } from '@/src/modules/words/dto/words.dto';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';
import { PartOfSpeech } from '@/src/entities/part-of-speech.entity';
import { Defination } from '@/src/entities/defination.entity';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Words)
    private wordsRepository: Repository<Words>,
    @InjectRepository(DifficultyLevel)
    private difficultyLevelRepository: Repository<DifficultyLevel>,
    @InjectRepository(PartOfSpeech)
    private partOfSpeechRepository: Repository<PartOfSpeech>,
    @InjectRepository(Defination)
    private definationRepository: Repository<Defination>,
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
        .leftJoinAndSelect('words.part_of_speech', 'word_part_of_speech')
        .leftJoinAndSelect('words.definitions', 'word_definitions')
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

  //----create-word-----------------------------------------
  async create(word: CreateWordDto): Promise<ICreateResponseData<Words>> {
    try {
      const data = new Words();

      data.word = word.word;

      //difficulty level
      const difficultyLevels = await this.difficultyLevelRepository.findBy({
        id: In(word.difficulty_level),
      });
      data.difficulty_level = difficultyLevels;

      //part of speech
      const partOfSpeeches = await this.partOfSpeechRepository.findBy({
        id: In(word.part_of_speech),
      });
      data.part_of_speech = partOfSpeeches;

      const newword = this.wordsRepository.create(data);

      //defination
      if (word.defination) {
        word.defination.forEach(async (item) => {
          const newdefination = new Defination();
          newdefination.defination = item;
          newdefination.words = newword;

          await this.definationRepository.save(newdefination);
        });
      }

      return {
        status: HttpStatus.CREATED,
        message: await this.i18n.translate('common.successCreateMessage'),
        data: await this.wordsRepository.save(newword),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----update-word-----------------------------------------
  async update(
    id: string,
    response: UpdateWordDto,
  ): Promise<ICreateResponseData<Words>> {
    try {
      const word = await this.wordsRepository.findOne({
        where: { id },
        relations: ['difficulty_level', 'part_of_speech'],
      });

      if (!word) {
        throw new HttpException(
          await this.i18n.translate('word.wordNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      if (response.word) {
        word.word = response.word;
      }

      if (response.difficulty_level) {
        const difficultyLevels = await this.difficultyLevelRepository.findBy({
          id: In(response.difficulty_level),
        });
        word.difficulty_level = difficultyLevels;
      }

      if (response.part_of_speech) {
        const partOfSpeeches = await this.partOfSpeechRepository.findBy({
          id: In(response.part_of_speech),
        });
        word.part_of_speech = partOfSpeeches;
      }

      await this.wordsRepository.save(word);
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

  //----delete-word-----------------------------------------
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

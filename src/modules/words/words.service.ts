import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  ICreateResponseData,
  IDeleteResponseData,
  IPaginationResponseData,
  IUpdateResponseData,
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
import { Example } from '@/src/entities/example.entity';

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
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
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

      const total = await this.wordsRepository.count();

      const qb = this.wordsRepository.createQueryBuilder('words');

      qb.leftJoinAndSelect('words.example', 'example')
        .leftJoinAndSelect('words.difficulty_level', 'difficulty')
        .leftJoinAndSelect('words.part_of_speech', 'speech')
        .leftJoinAndSelect('words.defination', 'defination')
        .select([
          'words.id',
          'words.word',
          'example.id',
          'example.example',
          'defination.id',
          'defination.defination',
          'difficulty.id',
          'difficulty.level',
          'speech.id',
          'speech.speech',
        ]);

      qb.skip(start).take(limit);

      const words = await qb.getMany();

      return {
        total,
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
      const data = await this.wordsRepository.findOne({
        where: { id },
        relations: [
          'example',
          'defination',
          'part_of_speech',
          'difficulty_level',
        ],
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

  //----create-word-----------------------------------------
  async create(body: CreateWordDto): Promise<ICreateResponseData<Words>> {
    try {
      const wordInstance = this.wordsRepository.create();

      wordInstance.word = body.word;

      //difficulty level
      if (body.difficulty_level) {
        try {
          const difficultyLevels = await this.difficultyLevelRepository.findBy({
            id: In(body.difficulty_level),
          });
          wordInstance.difficulty_level = difficultyLevels;
        } catch (error) {
          throw new HttpException(
            error.message,
            error.status || HttpStatus.BAD_REQUEST,
          );
        }
      }

      //part of speech
      if (body.part_of_speech) {
        try {
          const partOfSpeeches = await this.partOfSpeechRepository.findBy({
            id: In(body.part_of_speech),
          });
          wordInstance.part_of_speech = partOfSpeeches;
        } catch (error) {
          throw new HttpException(
            error.message,
            error.status || HttpStatus.BAD_REQUEST,
          );
        }
      }

      const savedWord = await this.wordsRepository.save(wordInstance);
      // defination
      if (body.defination) {
        try {
          body.defination.forEach(async (item) => {
            const definationInstance = new Defination();
            definationInstance.defination = item;
            definationInstance.words = savedWord;
            await this.definationRepository.save(definationInstance);
          });
        } catch (error) {
          throw new HttpException(
            error.message,
            error.status || HttpStatus.BAD_REQUEST,
          );
        }
      }

      //example-------------------------------------------
      if (body.example) {
        try {
          body.example.forEach(async (item) => {
            const exampleInstance = new Example();
            exampleInstance.example = item;
            exampleInstance.words = savedWord;
            await this.exampleRepository.save(exampleInstance);
          });
        } catch (error) {
          throw new HttpException(
            error.message,
            error.status || HttpStatus.BAD_REQUEST,
          );
        }
      }
      const result = await this.wordsRepository.save(savedWord);
      return {
        statusCode: HttpStatus.CREATED,
        message: await this.i18n.translate('common.successCreateMessage'),
        data: result,
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
  ): Promise<IUpdateResponseData<Words>> {
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

      if (response.defination) {
        const keys = response.defination.map((item) => item.key);
        const definations = await this.definationRepository.findBy({
          id: In(keys),
        });

        const updateable: Defination[] = response.defination
          .map((item) => {
            const exist = definations.find((i) => i.id === item.key);
            if (exist) {
              exist.defination = item.value;
              return exist;
            }
            return null;
          })
          .filter((item) => item !== null);

        word.defination = updateable;
      }

      await this.wordsRepository.save(word);
      return {
        statusCode: HttpStatus.OK,
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

  //-----adding-defination------------------------------------
  async addWordDefination(
    id: string,
    definations: string[],
  ): Promise<IUpdateResponseData<Words>> {
    try {
      const word = await this.wordsRepository.findOne({
        where: { id },
      });

      if (!word) {
        throw new HttpException(
          await this.i18n.translate('word.wordNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      definations.forEach(async (item) => {
        const newDefination = new Defination();
        newDefination.defination = item;
        newDefination.words = word;

        await this.definationRepository.save(newDefination);
      });

      await this.wordsRepository.save(word);
      return {
        statusCode: HttpStatus.OK,
        message: await this.i18n.translate('common.successUpdateMessage'),
        data: await this.wordsRepository.findOne({
          where: { id },
          relations: ['defination'],
        }),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //-----adding-defination------------------------------------
  async addWordExample(
    id: string,
    examples: string[],
  ): Promise<IUpdateResponseData<Words>> {
    try {
      const word = await this.wordsRepository.findOne({
        where: { id },
      });

      if (!word) {
        throw new HttpException(
          await this.i18n.translate('word.wordNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      examples.forEach(async (item) => {
        const newExample = new Example();
        newExample.example = item;
        newExample.words = word;

        await this.exampleRepository.save(newExample);
      });

      await this.wordsRepository.save(word);
      return {
        statusCode: HttpStatus.OK,
        message: await this.i18n.translate('common.successUpdateMessage'),
        data: await this.wordsRepository.findOne({
          where: { id },
          relations: ['example'],
        }),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //-----adding-part-of-speech------------------------------------
  async addWordPartOfSpeech(
    id: string,
    speech: string[],
  ): Promise<IUpdateResponseData<Words>> {
    try {
      const word = await this.wordsRepository.findOne({
        where: { id },
      });

      if (!word) {
        throw new HttpException(
          await this.i18n.translate('word.wordNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      const partOfSpeeches = await this.partOfSpeechRepository.findBy({
        id: In(speech),
      });

      word.part_of_speech = partOfSpeeches;

      await this.wordsRepository.save(word);
      return {
        statusCode: HttpStatus.OK,
        message: await this.i18n.translate('common.successUpdateMessage'),
        data: await this.wordsRepository.findOne({
          where: { id },
          relations: ['part_of_speech'],
        }),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

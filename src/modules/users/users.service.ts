import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/src/entities/users.entity';
import {
  ICreateResponseData,
  IDeleteResponseData,
  IPaginationResponseData,
} from '@/src/types/common.types';
import * as bcrypt from 'bcrypt';
import { funcPageLimitHandler } from '@/src/helpers/funcPageLimitHandler';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/src/generated/i18n.generated';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(DifficultyLevel)
    private difficultyLevelRepository: Repository<DifficultyLevel>,
    private i18n: I18nService<I18nTranslations>,
  ) {}
  //----users-list-----------------------------------------
  async list(
    ...rest: [number, number]
  ): Promise<IPaginationResponseData<User>> {
    try {
      const [page, limit] = funcPageLimitHandler(...rest);
      const [start, end] = [(page - 1) * limit, page * limit];
      const more = end < (await this.userRepository.count());

      const qb = this.userRepository.createQueryBuilder('user');

      const [users, count] = await qb
        .select()
        .leftJoinAndSelect('user.learning_level', 'difficulty')
        .offset(start)
        .limit(limit)
        .getManyAndCount();

      return {
        total: count,
        items: limit,
        page,
        more,
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----get-user-details-----------------------------------------
  async details(id: string): Promise<User> {
    try {
      const data = await this.userRepository.findOne({
        where: { id },
        relations: ['learning_level'],
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

  async create(user: CreateUserDto): Promise<ICreateResponseData<User>> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;

      const newuser = this.userRepository.create(user);
      return {
        statusCode: HttpStatus.CREATED,
        message: await this.i18n.translate('user.successCreateMessage'),
        data: await this.userRepository.save(newuser),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async userLearningLevel(
    id: string,
    levelid: string,
  ): Promise<ICreateResponseData<User>> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException(
          await this.i18n.translate('difficulty.userNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      const level = await this.difficultyLevelRepository.findOneBy({
        id: levelid,
      });

      if (!level) {
        throw new HttpException(
          await this.i18n.translate('difficulty.levelNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      user.learning_level = level;
      return {
        statusCode: HttpStatus.CREATED,
        message: await this.i18n.translate('common.successUpdateMessage'),
        data: await this.userRepository.save(user),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    user: UpdateUserDto,
  ): Promise<ICreateResponseData<User>> {
    try {
      await this.userRepository.update(id, user);
      return {
        statusCode: HttpStatus.OK,
        message: await this.i18n.translate('user.successUpdateMessage'),
        data: await this.userRepository.findOne({ where: { id } }),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<IDeleteResponseData> {
    try {
      await this.userRepository.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: await this.i18n.translate('user.successDeleteMessage'),
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

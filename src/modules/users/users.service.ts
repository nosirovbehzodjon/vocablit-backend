import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/src/entities/users.entity';
import {
  ICreateResponseData,
  IDeleteResponseData,
  IPaginationResponseData,
} from '@/src/types/common.types';
import { funcPageLimitHandler } from '@/src/helpers/funcPageLimitHandler';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/src/generated/i18n.generated';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

      const qb = this.userRepository.createQueryBuilder();

      const [users, count] = await qb
        .select()
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
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(user: Partial<User>): Promise<ICreateResponseData<User>> {
    try {
      const newuser = this.userRepository.create(user);
      return {
        status: HttpStatus.CREATED,
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

  async update(
    id: string,
    user: Partial<User>,
  ): Promise<ICreateResponseData<User>> {
    try {
      await this.userRepository.update(id, user);
      return {
        status: HttpStatus.OK,
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
        status: HttpStatus.OK,
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

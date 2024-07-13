import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import { GetDataQueryParamsDto } from 'src/common/dto/get-data-query-params.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Encrypter } from 'src/common/utilities/encrypter';
import { handleExceptions } from 'src/common/errors/handleExceptions';
import { PaginableOfUsers } from '../dtos/paginable-of-users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
  ) {}

  async findAll(query: GetDataQueryParamsDto): Promise<PaginableOfUsers> {
    const { queryDefaults } = this.configService;
    const { page = queryDefaults.page, count = queryDefaults.page_size } =
      query;
    const [data, totalCount] = await this.userRepository.findAndCount({
      where: { isActive: true },
      take: count,
      skip: count * (page - queryDefaults.min_page),
    });
    return {
      data,
      totalCount,
      count,
      page,
    };
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, isActive: true },
    });
    if (!user)
      throw new NotFoundException(
        `No existe el usuario con el id ${id} o esta inactivo`,
      );
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);
    if (updateUserDto.password) {
      updateUserDto.password = Encrypter.encrypt(updateUserDto.password);
    }
    try {
      return await this.userRepository.save({
        ...user,
        ...updateUserDto,
      });
    } catch (error) {
      handleExceptions(error, User.name);
    }
  }
  async deleteOneById(id: number) {
    await this.findOneById(id);
    await this.userRepository.save({ id, isActive: false });
    return `Usuario con id ${id} eliminado correctamente`;
  }
}

import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dtos/login.dto';
import { Encrypter } from 'src/common/utilities/encrypter';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { handleExceptions } from 'src/common/errors/handleExceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { password, username } = loginDto;
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) throw new UnauthorizedException('Credentials are not valid');
    if (!Encrypter.checkPassword(password, user.password))
      throw new UnauthorizedException('Credentials are not valid');
    if (!user.isActive)
      throw new ForbiddenException('User inactive, talk an administrator');
    delete user.password;
    return {
      user,
      jwt: this.getJwt({ id: user.id }),
    };
  }
  async register(createUserDto: CreateUserDto) {
    createUserDto.password = Encrypter.encrypt(createUserDto.password);
    try {
      const user = await this.userRepository.save(createUserDto);
      delete user.password;
      return user;
    } catch (error) {
      handleExceptions(error, User.name);
    }
  }
  private getJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}

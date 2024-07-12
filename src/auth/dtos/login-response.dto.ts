import { User } from 'src/modules/user/entities/user.entity';

export class LoginResponseDto {
  user: User;
  jwt: string;
}

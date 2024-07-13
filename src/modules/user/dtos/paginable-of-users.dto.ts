import { Paginable } from 'src/common/dto/paginable.interface';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PaginableOfUsers implements Paginable<User> {
  @ApiProperty({ type: [User] })
  data: User[];
  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  page: number;
}

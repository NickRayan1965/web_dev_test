import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { GetDataQueryParamsDto } from 'src/common/dto/get-data-query-params.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PaginableOfUsers } from '../dtos/paginable-of-users.dto';
import { User } from '../entities/user.entity';

@ApiTags('User')
@ApiBearerAuth()
@Auth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: PaginableOfUsers })
  @Get()
  async findAll(@Query() queryParams: GetDataQueryParamsDto) {
    return await this.userService.findAll(queryParams);
  }

  @ApiOkResponse({ type: User })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @ApiOkResponse({ type: User })
  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOneById(id);
  }

  @ApiOkResponse({ type: String })
  @Delete(':id')
  async deleteOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteOneById(id);
  }
}

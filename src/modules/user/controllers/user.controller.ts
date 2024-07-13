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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('User')
@ApiBearerAuth()
@Auth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() queryParams: GetDataQueryParamsDto) {
    return await this.userService.findAll(queryParams);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOneById(id);
  }

  @Delete(':id')
  async deleteOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteOneById(id);
  }
}

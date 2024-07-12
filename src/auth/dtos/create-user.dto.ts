import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { AllowNulls } from 'src/common/decorators/allow-null.decorator';

export class CreateUserDto {
  @ApiPropertyOptional({
    nullable: true,
    maxLength: 100,
  })
  @AllowNulls()
  @IsString()
  @MaxLength(100)
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    nullable: true,
    maxLength: 100,
  })
  @AllowNulls()
  @IsString()
  @MaxLength(100)
  @IsOptional()
  lastname: string;

  @ApiProperty({
    maxLength: 50,
  })
  @IsString()
  @MaxLength(50)
  username: string;

  @ApiPropertyOptional({
    nullable: true,
    maxLength: 200,
  })
  @AllowNulls()
  @IsEmail()
  @MaxLength(200)
  @IsOptional()
  email: string;

  @ApiProperty({
    maxLength: 50,
  })
  @IsString()
  @MaxLength(50)
  password: string;
}

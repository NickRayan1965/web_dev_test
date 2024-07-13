import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { AllowNulls } from 'src/common/decorators/allow-null.decorator';
import { UniqueConstraints } from 'src/common/decorators/unique-constraint.decorator';
import { User } from 'src/modules/user/entities/user.entity';

@UniqueConstraints<User>({
  entity: User,
  constraints: [
    {
      fields: ['username'],
      message: 'Ya existe un usuario con el nombre de usuario ingresado',
    },
  ],
})
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

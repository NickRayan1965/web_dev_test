import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class GetDataQueryParamsDto {
  @ApiPropertyOptional({
    default: process.env.DEFAULT_PAGE,
    minimum: 1,
  })
  @Min(1)
  @IsInt()
  @IsOptional()
  page: number;

  @ApiPropertyOptional({
    default: process.env.DEFAULT_PAGE_SIZE,
    minimum: 1,
  })
  @Min(1)
  @IsInt()
  @IsOptional()
  count: number;
}

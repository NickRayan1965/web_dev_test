import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { IConfig } from './interfaces/config.interface';
dotenv.config();

export default registerAs(
  'appConfig',
  (): IConfig => ({
    database: {
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
    },
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    queryDefaults: {
      page: +process.env.DEFAULT_PAGE,
      page_size: +process.env.DEFAULT_PAGE_SIZE,
      min_page: 1,
    },
  }),
);

import { IDbConfig } from './dbConfig.interface';
import { IQueryDefaultConfig } from './queryConfig.interface';

export interface IConfig {
  jwt_secret: string;
  database: IDbConfig;
  queryDefaults: IQueryDefaultConfig;
}

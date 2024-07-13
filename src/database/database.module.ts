import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [appConfig.KEY],
      useFactory: async (configService: ConfigType<typeof appConfig>) => {
        const { host, port, username, password, database } =
          configService.database;
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          ssl: true,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          //para dev
          autoLoadEntities: false,
          dropSchema: false,
          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}

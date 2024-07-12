import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const { host, port, username, password, database } = {} as any;
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          //para dev
          autoLoadEntities: true,
          dropSchema: true,
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}

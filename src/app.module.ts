import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EnvConfiguration from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

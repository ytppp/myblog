import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentsModule } from './contents/contents.module';
import { getConfig } from './utils';

const { PG_DATABASE_CONFIG } = getConfig();

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    TypeOrmModule.forRoot(PG_DATABASE_CONFIG),
    ContentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

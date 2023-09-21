import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from './content/content.module';
import { getConfig } from './utils';
// const path = require('path');

const { PG_DATABASE_CONFIG } = getConfig();

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    TypeOrmModule.forRoot({
      ...PG_DATABASE_CONFIG,
      // entities: [path.join(__dirname, `/**/*.entity{.ts,.js}`)],
    }),
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

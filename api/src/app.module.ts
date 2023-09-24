import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { getConfig } from './utils';
import { CategoriesModule } from './categories/categories.module';

const { PG_DATABASE_CONFIG } = getConfig();

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    TypeOrmModule.forRoot(PG_DATABASE_CONFIG),
    PostsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

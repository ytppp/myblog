import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from 'nestjs-prisma';
// import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';

const { DATABASE_URL } = getConfig();

console.log(DATABASE_URL);

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   ignoreEnvFile: true,
    //   isGlobal: true,
    //   load: [getConfig],
    // }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          datasourceUrl: DATABASE_URL,
        },
      },
    }),
    PostsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

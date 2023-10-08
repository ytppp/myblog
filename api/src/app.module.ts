import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.RUNNING_ENV === 'dev' ? '.env.dev' : '.env.prod',
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      // prismaServiceOptions: {
      //   prismaOptions: {
      //     datasourceUrl: process.env.DATABASE_URL,
      //   },
      // },
      // useFactory: async (configService: ConfigService) => {
      //   console.log(configService.get('DATABASE_URL'));
      //   return {
      //     prismaOptions: {
      //       datasources: {
      //         db: {
      //           url: configService.get('DATABASE_URL'),
      //         },
      //       },
      //     },
      //     explicitConnect: false,
      //   };
      // },
      // inject: [ConfigService],
    }),
    PostsModule,
    CategoriesModule,
    UsersModule,
    AuthsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

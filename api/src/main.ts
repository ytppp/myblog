import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  VersioningType,
  VERSION_NEUTRAL,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base-exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
// import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-client-exception.filter';
import { generateDocument } from './doc';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 异常过滤器
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter(),
  );

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 数据验证 移除没有任何验证装饰器的属性
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 创建文档
  generateDocument(app);

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  await app.listen(3000);
}
bootstrap();
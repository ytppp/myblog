import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentsController } from './contents/contents.controller';

@Module({
  imports: [],
  controllers: [AppController, ContentsController],
  providers: [AppService],
})
export class AppModule {}

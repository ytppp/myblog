import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentProviders } from './content.providers';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    ContentController
  ],
  providers: [...ContentProviders, ContentService],
  exports: [ContentService],
})
export class ContentModule { }
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TextAnalysisModule } from '../text-analysis/text-analysis.module';

@Module({
  imports: [
    TextAnalysisModule
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}

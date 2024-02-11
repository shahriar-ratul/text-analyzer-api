import { Module } from '@nestjs/common';
import { TextAnalysisService } from './text-analysis.service';

@Module({
  controllers: [],
  providers: [TextAnalysisService],
  exports: [TextAnalysisService],
})
export class TextAnalysisModule {}

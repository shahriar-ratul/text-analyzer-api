import { Module } from '@nestjs/common';
import { TextAnalysisService } from './text-analysis.service';
import { TextAnalysisController } from './text-analysis.controller';

@Module({
  controllers: [TextAnalysisController],
  providers: [TextAnalysisService],
})
export class TextAnalysisModule {}

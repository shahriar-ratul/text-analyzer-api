import { PartialType } from '@nestjs/swagger';
import { CreateTextAnalysisDto } from './create-text-analysis.dto';

export class UpdateTextAnalysisDto extends PartialType(CreateTextAnalysisDto) {}

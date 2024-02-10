import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TextAnalysisService } from './text-analysis.service';
import { CreateTextAnalysisDto } from './dto/create-text-analysis.dto';
import { UpdateTextAnalysisDto } from './dto/update-text-analysis.dto';

@Controller('text-analysis')
export class TextAnalysisController {
  constructor(private readonly textAnalysisService: TextAnalysisService) {}

  @Post()
  create(@Body() createTextAnalysisDto: CreateTextAnalysisDto) {
    return this.textAnalysisService.create(createTextAnalysisDto);
  }

  @Get()
  findAll() {
    return this.textAnalysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textAnalysisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextAnalysisDto: UpdateTextAnalysisDto) {
    return this.textAnalysisService.update(+id, updateTextAnalysisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textAnalysisService.remove(+id);
  }
}

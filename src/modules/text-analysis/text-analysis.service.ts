import { Injectable } from '@nestjs/common';
import { CreateTextAnalysisDto } from './dto/create-text-analysis.dto';
import { UpdateTextAnalysisDto } from './dto/update-text-analysis.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TextAnalysisService {

  constructor(
    private _prisma: PrismaService,
  ) { }

  findAll() {
    return `This action returns all textAnalysis`;
  }

  create(createTextAnalysisDto: CreateTextAnalysisDto) {
    return 'This action adds a new textAnalysis';
  }



  findOne(id: number) {
    return `This action returns a #${id} textAnalysis`;
  }

  update(id: number, updateTextAnalysisDto: UpdateTextAnalysisDto) {
    return `This action updates a #${id} textAnalysis`;
  }

  remove(id: number) {
    return `This action removes a #${id} textAnalysis`;
  }
}

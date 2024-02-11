import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TextAnalysisService } from '../text-analysis/text-analysis.service';

@Injectable()
export class UploadService {

  constructor(
    private _prisma: PrismaService,
    private _textAnalysisService: TextAnalysisService,
  ) { }

  findAll() {
    return `This action returns all upload`;
  }


  async create(file: Express.Multer.File) {

    const upload = await this._prisma.upload.create({
      data: {
        filename: file.filename,
        mimetype: file.mimetype,
        path: file.path,
        size: file.size,
      }
    });

    // read text file and store in database
    if (file.mimetype !== 'text/plain') {
      throw new Error('Invalid File type only .txt allowed');
    }

    const text = await this._textAnalysisService.uploadDataFile(upload.id);

    return {
      item: text,
      message: 'File uploaded successfully'
    }

  }


  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }






}

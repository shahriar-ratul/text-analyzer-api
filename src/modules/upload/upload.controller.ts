import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from "path";
import { FileInterceptor } from '@nestjs/platform-express';


export const storage = {
  storage: diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {

      if (!file) {
        return;
      }

      if (file.mimetype !== 'text/plain') {
        throw new HttpException('Invalid File type only .txt allowed', HttpStatus.BAD_REQUEST);
      }

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension: string = path.parse(file.originalname || "").ext;
      const filename: string = `${uniqueSuffix}${extension}`;
      cb(null, filename);
    },
  }),
};


@ApiTags('uploads')
@Controller('uploads')
export class UploadController {
  constructor(private readonly _uploadService: UploadService) { }


  @Get()
  findAll() {
    return this._uploadService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor("file", storage))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // check if file is valid
    await this.fileValidation(file);
    // console.log(file);
    return this._uploadService.create(file);
  }



  @Get("/get-number-of-words")
  async getNumberOfWords() {
    return this._uploadService.getNumberOfWords();
  }

  @Get("/get-number-of-characters")
  async getNumberOfCharacters() {
    return this._uploadService.getNumberOfCharacters();
  }

  @Get("/get-number-of-sentences")
  async getNumberOfSentences() {
    return this._uploadService.getNumberOfSentences();
  }


  @Get("/get-number-of-paragraphs")
  async getNumberOfParagraphs() {
    return this._uploadService.getNumberOfParagraphs();
  }

  @Get("/longest-word")
  async getLongestWordByParagraph() {
    return this._uploadService.getLongestWordByParagraph();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._uploadService.findOne(+id);
  }


  private async fileValidation(file: Express.Multer.File) {
    return new Promise((resolve) => {
      if (!file) {
        throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
      }

      if (file.mimetype !== 'text/plain') {
        throw new HttpException('Invalid File type only .txt allowed', HttpStatus.BAD_REQUEST);
      }
      resolve(true);
    });
  }



}

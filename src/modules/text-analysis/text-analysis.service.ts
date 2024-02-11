import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from "fs";
import { Upload } from '@prisma/client';
import { getUrl } from '@/common/helpers/GenerateHelpers';

@Injectable()
export class TextAnalysisService {

  constructor(
    private _prisma: PrismaService,
  ) { }

  findAll() {
    return `This action returns all textAnalysis`;
  }


  findOne(id: number) {
    return `This action returns a #${id} textAnalysis`;
  }

  async uploadDataFile(id: number) {
    const upload = await this._prisma.upload.findUnique({
      where: {
        id: id
      }
    });

    if (!upload) {
      throw new Error('File not found');

    }

    const text = await this.readTextFile(upload);

    let analysis = {
      numberOfCharacters: 0,
      numberOfWords: 0,
      numberOfParagraphs: 0,
      numberOfSentences: 0,
      longestWord: ''
    };

    if (text.length !== 0) {
      analysis = await this.analyzeText(text);
    }


    // store in database
    const textAnalysis = await this._prisma.textAnalysis.create({
      data: {
        uploadId: id,
        text: text,
        longestWord: analysis.longestWord,
        numberOfCharacters: analysis.numberOfCharacters,
        numberOfWords: analysis.numberOfWords,
        numberOfParagraphs: analysis.numberOfParagraphs,
        numberOfSentences: analysis.numberOfSentences,

      }
    });

    const uploadResult = {
      id: upload.id,
      filename: upload.filename,
      mimetype: upload.mimetype,
      path: getUrl(upload.path),
    }

    // remove unwanted fields
    delete textAnalysis.uploadId;
    delete textAnalysis.createdAt;
    delete textAnalysis.updatedAt;


    return {
      upload: uploadResult,
      textAnalysis: textAnalysis,
    };

  }

  async readTextFile(upload: Upload): Promise<string> {
    const data = fs.readFileSync(upload.path, 'utf8');
    return data;
  }

  async analyzeText(text: string) {
    const numberOfCharacters = text.length;

    const words = text.split(' ');
    const numberOfWords = words.length;

    const paragraphs = text.split('\n');
    const numberOfParagraphs = paragraphs.length;

    const sentences = text.split('.');
    const numberOfSentences = sentences.length - 1;

    const longestWord = await this.findLongestWord(text);

    return {
      numberOfCharacters,
      numberOfWords,
      numberOfParagraphs,
      numberOfSentences,
      longestWord
    };
  }

  async findLongestWord(text: string) {
    let longestWord = text.split(' ').reduce(function (longest, currentWord) {
      return currentWord.length > longest.length ? currentWord : longest;
    }, "");
    return longestWord;
  }



} 

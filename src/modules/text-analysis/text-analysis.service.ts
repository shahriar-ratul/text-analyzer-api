import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from "fs";
import { Upload } from '@prisma/client';
import { getUrl } from '@/common/helpers/GenerateHelpers';
import * as path from 'path';

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


  async getNumberOfWordsFromFile() {
    const filePath = path.join(process.cwd(), './public/sample.txt');

    const text = fs.readFileSync(filePath, 'utf8');
    const words = text.split(' ');
    return words.length;
  }

  async getNumberOfCharactersFromFile() {
    const filePath = path.join(process.cwd(), './public/sample.txt');

    const text = fs.readFileSync(filePath, 'utf8');
    return text.length;
  }

  async getNumberOfParagraphsFromFile() {
    const filePath = path.join(process.cwd(), './public/sample.txt');

    const text = fs.readFileSync(filePath, 'utf8');
    const paragraphs = text.split('\n');
    return paragraphs.length - 1;
  }

  async getNumberOfSentencesFromFile() {

    const filePath = path.join(process.cwd(), './public/sample.txt');

    const text = fs.readFileSync(filePath, 'utf8');
    const sentences = text.split('.');
    return sentences.length - 1;
  }

  async getLongestWordByParagraphFromFile() {
    const filePath = path.join(process.cwd(), './public/sample.txt');

    const text = fs.readFileSync(filePath, 'utf8');
    const paragraphs = text.split('\n');
    let longestWordList = [];
    let longestWord = '';
    paragraphs.forEach((paragraph) => {
      if (paragraph.length === 0) {
        return;
      }
      const words = paragraph.split(' ');
      longestWord = words.reduce(function (longest, currentWord) {
        return currentWord.length > longest.length ? currentWord : longest;
      }, "");
      longestWordList.push(longestWord);
    });
    return longestWordList;
  }



} 

import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {

  constructor(
    private _prisma: PrismaService,
  ) { }

  findAll() {
    return `This action returns all upload`;
  }


  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }


  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}

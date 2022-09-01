import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFileType } from './uploaded-file.type';
import { NotEmptyPipe } from '../not-empty.pipe';
import { Multer } from 'multer';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })], //10mb
      }),
    )
    file: Express.Multer.File,
  ): UploadedFileType {
    return { ...file, url: this.fileUploadService.getFileUrl(file.filename) };
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }), //1mb
          new FileTypeValidator({ fileType: /(png|jpeg)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): UploadedFileType {
    return this.uploadFile(file);
  }

  @Delete()
  removeFile(@Body('file', NotEmptyPipe) fileName: string) {
    return this.fileUploadService.removeFile(fileName);
  }
}

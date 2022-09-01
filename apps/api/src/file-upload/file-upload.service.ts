import { Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';

@Injectable()
export class FileUploadService {
  getFileUrl(fileName: string) {
    return `${process.env.BASE_URL}/public/${fileName}`;
  }

  removeFile(fileName: string) {
    try {
      const filePath = `./uploads/${fileName}`;
      unlinkSync(filePath);
      return true;
    } catch (e) {
      return false;
    }
  }
}

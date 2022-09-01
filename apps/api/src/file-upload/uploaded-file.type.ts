import { Multer } from 'multer';

export interface UploadedFileType extends Multer.File {
  url?: string;
}

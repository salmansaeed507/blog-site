export interface UploadedFileType extends Express.Multer.File {
  url?: string;
}

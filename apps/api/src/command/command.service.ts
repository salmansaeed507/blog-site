import { Injectable } from '@nestjs/common';
import { BlogService } from '../blog/blog.service';

@Injectable()
export class CommandService {
  constructor(private readonly blogService: BlogService) {}

  async run() {
    const argv = process.argv;
    if (argv.includes('elastic-sync')) {
      console.log('Command Service: Executing elastic-sync command...');
      await this.blogService.elasticSync();
    }
    console.log('Command Service: All commands executed successfully!');
    return true;
  }
}

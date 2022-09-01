import { Inject, NotFoundException, PipeTransform } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { Blog } from './entities/blog.entity';

export class BlogExistPipe implements PipeTransform {
  constructor(
    @Inject(GenericService) private readonly genericService: GenericService,
  ) {}

  async transform(value: string): Promise<string> {
    if (!(await this.genericService.exists(Blog, value))) {
      throw new NotFoundException();
    }
    return value;
  }
}

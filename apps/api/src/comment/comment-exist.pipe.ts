import { Inject, NotFoundException, PipeTransform } from '@nestjs/common';
import { CommentService } from './comment.service';

export class CommentExistPipe implements PipeTransform {
  constructor(
    @Inject(CommentService) private readonly commentService: CommentService,
  ) {}

  async transform(value: string) {
    if (!(await this.commentService.commentExists(value))) {
      throw new NotFoundException();
    }
    return value;
  }
}

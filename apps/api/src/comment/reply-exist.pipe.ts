import { Inject, NotFoundException, PipeTransform } from '@nestjs/common';
import { ReplyService } from './reply.service';

export class ReplyExistPipe implements PipeTransform {
  constructor(
    @Inject(ReplyService) private readonly replyService: ReplyService,
  ) {}

  async transform(value: string) {
    if (!(await this.replyService.replyExists(value))) {
      throw new NotFoundException();
    }
    return value;
  }
}

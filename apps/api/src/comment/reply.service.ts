import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { PostReplyInput } from './dto/post-reply.input';
import { Reply } from './entities/reply.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply) private readonly replyRepo: Repository<Reply>,
  ) {}

  /**
   * Posts a reply against a blog
   * @param User
   * @param blogId
   * @param postCommentInput
   * @returns Promise<Reply>
   */
  async postReply(
    { userId }: User,
    commentId: string,
    postReplyInput: PostReplyInput,
  ): Promise<Reply> {
    const reply = { userId, commentId, ...postReplyInput };
    return this.replyRepo.save(reply);
  }

  /**
   * Deletes a reply by UUID
   * @param commentId
   * @returns Promise<boolean>
   */
  async remove(id: string): Promise<boolean> {
    const deleteResult = await this.replyRepo.delete({
      id,
    });
    return deleteResult.affected > 0;
  }

  /**
   * Deletes all replies against a comment
   * @param commentId
   * @returns Promise<boolean>
   */
  async removeAllByCommentId(commentId: string): Promise<boolean> {
    const deleteResult = await this.replyRepo.delete({
      commentId,
    });
    return deleteResult.affected > 0;
  }

  /**
   * Checks if reply exists by UUID
   * @param id
   * @returns Promise<boolean>
   */
  async replyExists(id: string): Promise<boolean> {
    const nReply = await this.replyRepo.countBy({ id });
    return nReply > 0;
  }

  /**
   * Fetches replies against comment by UUID
   * @param commentId
   * @returns Promise<Reply[]>
   */
  async getReplies(commentId: string): Promise<Reply[]> {
    return this.replyRepo.findBy({ commentId });
  }
}

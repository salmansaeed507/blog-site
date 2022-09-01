import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CursorPaginationArgs } from '../cursor-pagination.args';
import { SimplePaginationArgs } from '../simple-pagination.args';
import { User } from '../user/entities/user.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { PostCommentInput } from './dto/post-comment.input';
import { CommentEdge } from './entities/comment.edge';
import { Comment } from './entities/comment.entity';
import { Reply } from './entities/reply.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Reply) private readonly replyRepo: Repository<Reply>,
  ) {}

  /**
   * Posts a comment against a blog
   * @param User
   * @param blogId
   * @param postCommentInput
   * @returns posted Comment
   */
  async postComment(
    { userId }: User,
    blogId: string,
    postCommentInput: PostCommentInput,
  ): Promise<Comment> {
    const comment = { userId, blogId, ...postCommentInput };
    return this.commentRepo.save(comment);
  }

  /**
   * Deletes a comment by UUID
   * @param User
   * @param commentId
   * @returns boolean
   */
  async remove({ userId }: User, id: string): Promise<boolean> {
    const deleteResult = await this.commentRepo.delete({
      id,
      userId,
    });
    await this.replyRepo.delete({
      commentId: id,
    });
    return deleteResult.affected > 0;
  }

  async removeAllByBlogId(blogId: string): Promise<boolean> {
    const deleteResult = await this.commentRepo.delete({
      blogId,
    });
    return deleteResult.affected > 0;
  }

  /**
   * Checks if comment exists by UUID
   * @param commentId
   * @returns boolean
   */
  async commentExists(id: string): Promise<boolean> {
    const nComment = await this.commentRepo.countBy({ id });
    return nComment > 0;
  }

  /**
   * Fetches comments or sub comments against blog or parent Comment by UUID
   * @param blogId
   * @param paginationArgs: SimplePaginationArgs
   * @returns Promise<Comment[]>
   */
  async getComments(
    blogId: string,
    paginationArgs: SimplePaginationArgs = { limit: 0, offset: 0 },
  ): Promise<Comment[]> {
    return this.commentRepo.find({
      where: { blogId },
      order: { createdAt: 'ASC' },
      take: paginationArgs.limit,
      skip: paginationArgs.offset,
    });
  }

  /**
   * Fetches comments against blog by UUID with cursor based pagination
   * @param blogId string
   * @param paginationArgs CursorPaginationArgs
   * @returns Promise<CommentEdge[]>
   */
  async getCommentsCursored(
    blogId: string,
    paginationArgs: CursorPaginationArgs = { limit: 0 },
  ): Promise<CommentEdge[]> {
    const query = this.commentRepo
      .createQueryBuilder()
      .where({ blogId })
      .orderBy('Comment.createdAt')
      .limit(paginationArgs.limit);
    if (paginationArgs.after) {
      const date = new Date(
        Buffer.from(paginationArgs.after, 'base64').toString('ascii'),
      );
      date.setMilliseconds(date.getMilliseconds() + 1);
      query.andWhere({
        createdAt: MoreThan(date),
      });
    }
    if (paginationArgs.before) {
      const date = new Date(
        Buffer.from(paginationArgs.before, 'base64').toString('ascii'),
      );
      date.setMilliseconds(date.getMilliseconds() - 1);
      query.andWhere({
        createdAt: LessThan(date),
      });
      query.orderBy('Comment.createdAt', 'DESC');
    }
    const comments = await query.getMany();
    if (paginationArgs.before) {
      comments.reverse();
    }

    return comments.map((comment) => {
      return {
        node: comment,
        cursor: Buffer.from(comment.createdAt.toISOString()).toString('base64'),
      };
    });
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

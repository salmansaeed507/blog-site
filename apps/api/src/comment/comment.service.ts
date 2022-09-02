import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CursorPaginationArgs } from '../cursor-pagination.args';
import { SimplePaginationArgs } from '../simple-pagination.args';
import { User } from '../user/entities/user.entity';
import { MoreThan, Repository } from 'typeorm';
import { PostCommentInput } from './dto/post-comment.input';
import { Comment } from './entities/comment.entity';
import { Reply } from './entities/reply.entity';
import { CommentCursorPagination } from './comments-cursor-pagination';
import { PaginationService } from '../generic/pagination/pagination.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Reply) private readonly replyRepo: Repository<Reply>,
    private readonly paginationService: PaginationService
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
    postCommentInput: PostCommentInput
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
    paginationArgs: SimplePaginationArgs = { limit: 0, offset: 0 }
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
   * @returns Promise<CommentCursorPagination>
   */
  async getCommentsCursored(
    blogId: string,
    paginationArgs: CursorPaginationArgs = { count: 0 }
  ): Promise<CommentCursorPagination> {
    const query = this.commentRepo
      .createQueryBuilder()
      .where({ blogId })
      .orderBy('Comment.createdAt');

    return this.paginationService.cursorPaginate(
      query,
      paginationArgs,
      function (query, cursor) {
        const date = new Date(Buffer.from(cursor, 'base64').toString('ascii'));
        date.setMilliseconds(date.getMilliseconds() + 1);
        query.andWhere({
          createdAt: MoreThan(date),
        });
      },
      function (comment: Comment) {
        return Buffer.from(comment.createdAt.toISOString()).toString('base64');
      }
    );
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

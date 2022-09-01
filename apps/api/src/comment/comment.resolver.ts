import { BadRequestException, Inject, ParseUUIDPipe } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthUser } from '../user/auth/graphql-auth-user.decorator';
import { BlogExistPipe } from '../blog/blog-exist.pipe';
import { User } from '../user/entities/user.entity';
import { CommentExistPipe } from './comment-exist.pipe';
import { CommentService } from './comment.service';
import { PostCommentInput } from './dto/post-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';
import * as DataLoader from 'dataloader';
import { Roles } from '../user/roles.decorator';
import { Role } from '../user/role.enum';
import { Reply } from './entities/reply.entity';
import { GenericService } from '../generic/generic.service';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    @Inject('UserLoader') private readonly userLoader: DataLoader<string, User>,
    private readonly genericService: GenericService,
  ) {}

  /**
   * posts comment against blog by UUID
   * @param blogId
   * @param postCommentInput
   * @returns posted Comment
   * @throws NotFoundException if blog does not exist
   *         or parentComment does not exist
   */
  @Roles(Role.Admin, Role.User)
  @Mutation(() => Comment)
  async postComment(
    @AuthUser() user: User,
    @Args('blogId', ParseUUIDPipe, BlogExistPipe)
    blogId: string,
    @Args('postCommentInput') postCommentInput: PostCommentInput,
  ): Promise<Comment> {
    if (
      postCommentInput.parentCommentId &&
      !(await this.commentService.commentExists(
        postCommentInput.parentCommentId,
      ))
    ) {
      throw new BadRequestException();
    }
    return this.commentService.postComment(user, blogId, postCommentInput);
  }

  /**
   * Updates comment by UUID
   * @param commentId
   * @param updateCommentInput
   * @returns updated Comment
   * @throws NotFoundException if comment does not exist
   */
  @Roles(Role.Admin, Role.User)
  @Mutation(() => Comment)
  async updateComment(
    @Args('commentId', ParseUUIDPipe, CommentExistPipe)
    id: string,
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    await this.genericService.update(Comment, id, updateCommentInput);
    const comment = await this.genericService.findOne(Comment, id);
    return comment;
  }

  /**
   * Deletes a comment by UUID
   * @param commentId
   * @returns boolean
   * @throws NotFoundException if comment does not exist
   */
  @Roles(Role.Admin, Role.User)
  @Mutation(() => Boolean)
  deleteComment(
    @AuthUser() user: User,
    @Args('commentId', ParseUUIDPipe, CommentExistPipe)
    commentId: string,
  ): Promise<boolean> {
    return this.commentService.remove(user, commentId);
  }

  @ResolveField('replies', () => [Reply])
  async getComments(@Parent() { id }: Comment): Promise<Reply[]> {
    return this.commentService.getReplies(id);
  }

  @ResolveField('user', () => User, { nullable: true })
  async getUser(@Parent() { userId }: Comment): Promise<User | null> {
    return this.userLoader.load(userId);
  }
}

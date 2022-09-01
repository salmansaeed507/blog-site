import { Inject, ParseUUIDPipe } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthUser } from '../user/auth/graphql-auth-user.decorator';
import { User } from '../user/entities/user.entity';
import { CommentExistPipe } from './comment-exist.pipe';
import * as DataLoader from 'dataloader';
import { Roles } from '../user/roles.decorator';
import { Role } from '../user/role.enum';
import { Reply } from './entities/reply.entity';
import { ReplyService } from './reply.service';
import { PostReplyInput } from './dto/post-reply.input';
import { ReplyExistPipe } from './reply-exist.pipe';
import { UpdateReplyInput } from './dto/update-reply.input';
import { GenericService } from '../generic/generic.service';

@Resolver(() => Reply)
export class ReplyResolver {
  constructor(
    private readonly replyService: ReplyService,
    @Inject('UserLoader') private readonly userLoader: DataLoader<string, User>,
    private readonly genericService: GenericService,
  ) {}

  @Roles(Role.Admin, Role.User)
  @Mutation(() => Reply)
  async postReply(
    @AuthUser() user: User,
    @Args('commentId', ParseUUIDPipe, CommentExistPipe)
    commentId: string,
    @Args('postReplyInput') postReplyInput: PostReplyInput,
  ): Promise<Reply> {
    return this.replyService.postReply(user, commentId, postReplyInput);
  }

  @Roles(Role.Admin, Role.User)
  @Mutation(() => Reply)
  async updateReply(
    @Args('replyId', ParseUUIDPipe, ReplyExistPipe)
    id: string,
    @Args('updateReplyInput') updateReplyInput: UpdateReplyInput,
  ): Promise<Reply> {
    await this.genericService.update(Reply, id, updateReplyInput);
    return this.genericService.findOne(Reply, id);
  }

  @Roles(Role.Admin, Role.User)
  @Mutation(() => Boolean)
  deleteReply(
    @Args('replyId', ParseUUIDPipe, ReplyExistPipe)
    replyId: string,
  ): Promise<boolean> {
    return this.replyService.remove(replyId);
  }

  @ResolveField('user', () => User, { nullable: true })
  async getUser(@Parent() { userId }: Reply): Promise<User | null> {
    return this.userLoader.load(userId);
  }
}

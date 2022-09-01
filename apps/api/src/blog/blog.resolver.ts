import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { User } from '../user/entities/user.entity';
import { Blog } from './entities/blog.entity';
import { Inject, ParseUUIDPipe } from '@nestjs/common';
import { BlogExistPipe } from './blog-exist.pipe';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/entities/comment.entity';
import { AuthUser } from '../user/auth/graphql-auth-user.decorator';
import * as DataLoader from 'dataloader';
import { Roles } from '../user/roles.decorator';
import { Role } from '../user/role.enum';
import { SimplePaginationArgs } from '../simple-pagination.args';
import { CommentEdge } from '../comment/entities/comment.edge';
import { CursorPaginationArgs } from '../cursor-pagination.args';
import { FileUploadService } from '../file-upload/file-upload.service';
import { NotEmptyPipe } from '../not-empty.pipe';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(
    private readonly blogService: BlogService,
    private readonly commentService: CommentService,
    @Inject('UserLoader')
    private readonly dataLoader: DataLoader<string, User>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Roles(Role.Admin, Role.User)
  @Mutation(() => Blog)
  async createBlog(
    @AuthUser() user: User,
    @Args('createBlogInput') createBlogInput: CreateBlogInput,
  ): Promise<Blog> {
    return this.blogService.create(user, createBlogInput);
  }

  @Roles(Role.Admin, Role.User)
  @Mutation(() => Blog)
  async updateBlog(
    @Args('blogId', ParseUUIDPipe, BlogExistPipe)
    blogId: string,
    @Args('updateBlogInput') updateBlogInput: UpdateBlogInput,
  ): Promise<Blog> {
    return this.blogService.update(blogId, updateBlogInput);
  }

  @Roles(Role.Admin)
  @Mutation(() => Boolean)
  async removeBlog(
    @AuthUser() user: User,
    @Args('blogId', ParseUUIDPipe, BlogExistPipe)
    blogId: string,
  ): Promise<boolean> {
    return this.blogService.remove(user, blogId);
  }

  @Roles(Role.Admin)
  @Mutation(() => Boolean)
  async syncBlogs(): Promise<boolean> {
    return this.blogService.elasticSync();
  }

  @Query(() => Blog, { name: 'blog', nullable: true })
  async findOne(
    @Args('blogId', ParseUUIDPipe) blogId: string,
  ): Promise<Blog | null> {
    return this.blogService.findOne(blogId);
  }

  @Query(() => [Blog], { name: 'blogs' })
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Query(() => [Blog], { name: 'search' })
  async search(
    @Args('keyword', NotEmptyPipe) keyword: string,
  ): Promise<Blog[]> {
    return this.blogService.search(keyword);
  }

  @ResolveField('user', () => User, { nullable: true })
  async getUser(@Parent() { userId }: Blog): Promise<User | null> {
    return this.dataLoader.load(userId);
  }

  @ResolveField('comments', () => [Comment])
  async getComments(
    @Parent() { id }: Blog,
    @Args() paginationArgs: SimplePaginationArgs,
  ): Promise<Comment[]> {
    return this.commentService.getComments(id, paginationArgs);
  }

  @ResolveField('commentsCursored', () => [CommentEdge])
  async getCommentsCursored(
    @Parent() { id }: Blog,
    @Args() paginationArgs: CursorPaginationArgs,
  ): Promise<CommentEdge[]> {
    return this.commentService.getCommentsCursored(id, paginationArgs);
  }

  @ResolveField('imageUrl', () => String)
  getImageUrl(@Parent() { image }: Blog): string {
    return this.fileUploadService.getFileUrl(image);
  }
}

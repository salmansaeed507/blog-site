import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CommentService } from '../comment/comment.service';
import BlogSearchService from './blog-search.service';
import { UpdateBlogInput } from './dto/update-blog.input';
import { GenericService } from '../generic/generic.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
    private readonly commentService: CommentService,
    private readonly blogSearchService: BlogSearchService,
    private readonly genericService: GenericService
  ) {}

  /**
   * Creates new blog
   * @param User
   * @param createBlogInput
   * @returns created Blog
   */
  async create(
    { userId }: User,
    createBlogInput: CreateBlogInput
  ): Promise<Blog> {
    return this.blogRepo.save({ userId, ...createBlogInput });
  }

  /**
   * updates an entity by UUID
   * @param id
   * @param input object
   * @param userId
   * @returns updated entity
   */
  async update(
    blogId: string,
    updateBlogInput: UpdateBlogInput
  ): Promise<Blog> {
    const isUpdated = await this.genericService.update(
      Blog,
      blogId,
      updateBlogInput
    );
    const blog = await this.findOne(blogId);
    if (isUpdated) {
      this.blogSearchService.update(blog);
    }
    return blog;
  }

  /**
   * Deletes a blog by UUID
   * @param User
   * @param blogId
   * @returns boolean
   */
  async remove(id: string): Promise<boolean> {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) {
      return false;
    }
    const result = await this.blogRepo.remove(blog);
    await this.commentService.removeAllByBlogId(id);
    return result ? true : false;
  }

  /**
   * Fetches all blogs
   * @returns list of Blogs
   */
  async findAll(): Promise<Blog[]> {
    return this.blogRepo.find();
  }

  /**
   * Fetches single blog by UUID
   * @param blogId
   * @returns single Blog
   */
  async findOne(id: string): Promise<Blog | null> {
    return this.blogRepo.findOneBy({ id });
  }

  /**
   * Search blogs from elasticsearch
   * @param keyword
   * @returns Promise<Blog[]>
   */
  async search(keyword: string): Promise<Blog[]> {
    return this.blogSearchService.search(keyword);
  }

  /**
   * Sync all blogs in elasticsearch index
   * CAUTION: This is helper function, must not be used in production
   * @returns Promise<boolean>
   */
  async elasticSync(): Promise<boolean> {
    return true;
    // const blogs = await this.blogRepo.find();
    // return this.blogSearchService.sync(blogs);
  }
}

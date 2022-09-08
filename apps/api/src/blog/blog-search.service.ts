import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticSyncEntity } from '../generic/entities/elastic-sync-log.entity';
import { GenericService } from '../generic/generic.service';
import { UserService } from '../user/user.service';
import { Blog } from './entities/blog.entity';

@Injectable()
export default class BlogSearchService {
  indexName = 'blogs';

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly userService: UserService,
    private readonly genericService: GenericService
  ) {}

  /**
   * Indexes a blog in elasticsearch index
   * @param blog Blog
   * @returns Promise<boolean>
   */
  async index(blog: Blog): Promise<boolean> {
    blog.user = await this.userService.findById(blog.userId);
    const result = await this.elasticsearchService.index<Blog>({
      id: blog.id,
      index: this.indexName,
      document: blog,
    });
    if (result.result == 'created') {
      await this.genericService.createElasticSyncLog(
        ElasticSyncEntity.blog,
        blog.id
      );
    }
    return result.result == 'created';
  }

  /**
   * Upserts a blog in elasticsearch index
   * @param blog Blog
   * @returns Promise<boolean>
   */
  async update(blog: Blog): Promise<boolean> {
    const result = await this.elasticsearchService.update({
      index: this.indexName,
      id: blog.id,
      doc: blog,
      doc_as_upsert: true,
    });
    return result.result == 'updated';
  }

  /**
   * Removes a blog from elasticsearch index by id
   * @param id string
   * @returns Promise<boolean>
   */
  async remove(id: string): Promise<boolean> {
    try {
      const result = await this.elasticsearchService.delete({
        index: this.indexName,
        id,
      });
      if (result.result == 'deleted') {
        await this.genericService.deleteElasticSyncLog(
          ElasticSyncEntity.blog,
          id
        );
      }
      return result.result == 'deleted';
    } catch (e) {
      return false;
    }
  }

  /**
   * Search blogs from elasticsearch
   * @param text
   * @returns Promise<Blog[]>
   */
  async search(text: string): Promise<Blog[]> {
    const searchResult = await this.elasticsearchService.search<Blog>({
      index: this.indexName,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: [
              'title',
              'description',
              'shortDescription',
              'content',
              'user.email',
            ],
          },
        },
      },
    });
    const hits = searchResult.hits.hits;
    return hits.map((item) => item._source);
  }

  /**
   * Sync all blogs in elasticsearch index
   * CAUTION: This is helper function, must not be used in production
   * @param blogs string
   * @returns Promise<boolean>
   */
  async sync(blogs: Blog[]): Promise<boolean> {
    blogs.map(async (blog) => {
      await this.index(blog);
    });
    return true;
  }
}

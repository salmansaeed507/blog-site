import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';
import BlogSearchService from '../blog-search.service';
import { BlogGateway } from '../blog.gateway';
import { Blog } from '../entities/blog.entity';

@EventSubscriber()
export class BlogSubscriber implements EntitySubscriberInterface<Blog> {
  constructor(
    dataSource: DataSource,
    private readonly blogSearchService: BlogSearchService,
    private readonly blogGateway: BlogGateway
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Blog;
  }

  afterInsert(event: InsertEvent<Blog>): void | Promise<any> {
    this.blogGateway.emitBlogCreated(event.entity);
    this.blogSearchService.index(event.entity);
  }

  afterRemove(event: RemoveEvent<Blog>): void | Promise<any> {
    this.blogSearchService.remove(event.entityId);
  }
}

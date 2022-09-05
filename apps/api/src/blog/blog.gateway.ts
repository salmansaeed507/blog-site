import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Blog } from './entities/blog.entity';

@WebSocketGateway()
export class BlogGateway {
  @WebSocketServer()
  server: Server;

  emitBlogCreated(blog: Blog) {
    this.server.emit('blog:created', blog.id);
  }
}

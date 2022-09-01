import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UserModule } from '../user/user.module';
import { Reply } from './entities/reply.entity';
import { ReplyService } from './reply.service';
import { ReplyResolver } from './reply.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Reply]), UserModule],
  providers: [CommentResolver, CommentService, ReplyResolver, ReplyService],
  exports: [CommentService],
})
export class CommentModule {}

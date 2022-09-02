import { ObjectType } from '@nestjs/graphql';
import { Comment } from './entities/comment.entity';
import { CursorPagination } from '../generic/pagination/cursor-pagination';

@ObjectType()
export class CommentCursorPagination extends CursorPagination(Comment) {}

import { InputType } from '@nestjs/graphql';
import { PostCommentInput } from '../../comment/dto/post-comment.input';

@InputType()
export class PostReplyInput extends PostCommentInput {}

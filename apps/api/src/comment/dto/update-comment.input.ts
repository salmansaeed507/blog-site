import { InputType, PartialType } from '@nestjs/graphql';
import { PostCommentInput } from '../../comment/dto/post-comment.input';

@InputType()
export class UpdateCommentInput extends PartialType(PostCommentInput) {}

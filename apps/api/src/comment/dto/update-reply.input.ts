import { InputType, PartialType } from '@nestjs/graphql';
import { PostReplyInput } from './post-reply.input';

@InputType()
export class UpdateReplyInput extends PartialType(PostReplyInput) {}

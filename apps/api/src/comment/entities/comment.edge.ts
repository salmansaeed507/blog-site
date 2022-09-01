import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.entity';

@ObjectType()
export class CommentEdge {
  @Field(() => Comment)
  node: Comment;

  @Field(() => String)
  cursor: string;
}

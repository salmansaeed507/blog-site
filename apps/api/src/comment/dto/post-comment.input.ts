import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PostCommentInput {
  @Field(() => String)
  comment: string;

  @Field(() => String, { nullable: true })
  parentCommentId?: string | null;
}

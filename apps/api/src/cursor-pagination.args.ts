import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CursorPaginationArgs {
  @Field(() => String, { nullable: true })
  before?: string;

  @Field(() => String, { nullable: true })
  after?: string;

  @Field(() => Int)
  limit = 5;
}

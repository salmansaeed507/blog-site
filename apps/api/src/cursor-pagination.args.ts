import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CursorPaginationArgs {
  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => Int)
  count = 5;
}

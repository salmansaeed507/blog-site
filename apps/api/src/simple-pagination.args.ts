import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class SimplePaginationArgs {
  @Field(() => Int)
  offset = 0;

  @Field(() => Int)
  limit = 5;
}

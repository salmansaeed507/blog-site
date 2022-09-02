import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function CursorPagination<T>(ItemType: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field(() => [ItemType])
    data: T[];

    @Field(() => String, { nullable: true })
    nextCursor: string | null;
  }

  return PageClass;
}

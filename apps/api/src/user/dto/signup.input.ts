import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

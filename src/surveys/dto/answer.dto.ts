import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class AnswerInput {
  @Field()
  public text: string;
}

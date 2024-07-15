import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNewsInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNewsVideoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

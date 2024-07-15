import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSavedInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

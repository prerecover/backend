import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNewsImageInput {
    @Field(() => Int, { description: 'Example field (placeholder)' })
    exampleField: number;
}

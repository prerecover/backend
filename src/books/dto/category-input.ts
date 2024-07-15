import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
    @Field()
    public title: string;
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSavedInput {
    @Field()
    authorId: string;

    @Field()
    newsId: string;
}

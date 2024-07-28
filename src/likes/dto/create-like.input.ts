import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLikeInput {
    @Field()
    authorId: string;

    @Field()
    newsId: string;
}

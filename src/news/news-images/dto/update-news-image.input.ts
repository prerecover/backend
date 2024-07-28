import { CreateNewsImageInput } from './create-news-image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNewsImageInput extends PartialType(CreateNewsImageInput) {
    @Field(() => Int)
    id: number;
}

import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateReviewInput {
    @IsNotEmpty()
    @Field(() => Float)
    public rating: number;

    @IsNotEmpty()
    @MaxLength(8000)
    @Field()
    public text: string;
}

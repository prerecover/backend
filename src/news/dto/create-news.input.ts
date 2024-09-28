import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateNewsInput {
    @IsNotEmpty()
    @MaxLength(30)
    @MinLength(2)
    @Field()
    public title: string;

    @IsNotEmpty()
    @MinLength(2)
    @Field()
    public text: string;
}

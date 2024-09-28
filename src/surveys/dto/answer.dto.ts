import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AnswerInput {
    @Field()
    public text: string;
}

import { Field, InputType } from '@nestjs/graphql';
import { AnswerInput } from './answer.dto';

@InputType()
export class QuestionInput {
    @Field()
    public text: string;

    @Field(() => [AnswerInput])
    public answers: AnswerInput[];
}

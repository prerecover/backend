import { Field, InputType } from '@nestjs/graphql';
import { QuestionInput } from './question.dto';

@InputType()
export class SurveyInput {
    @Field({ nullable: true })
    public title: string;

    @Field(() => [QuestionInput])
    public questions: QuestionInput[];
}

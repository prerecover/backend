import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { QuestionAnswer } from '../answers/entities/answer.entity';
import { SurveyQuestion } from './entities/question.entity';

@Resolver(() => SurveyQuestion)
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @ResolveField('answers', () => [QuestionAnswer])
  async answers(@Parent() question: SurveyQuestion): Promise<QuestionAnswer[]> {
    const { _id: questionId } = question;
    return await this.questionsService.answersForQuestion(questionId);
  }
}

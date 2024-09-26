import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyQuestion } from './entities/question.entity';
import { QuestionAnswer } from '../answers/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyQuestion, QuestionAnswer])],
  providers: [QuestionsResolver, QuestionsService],
})
export class QuestionsModule {}

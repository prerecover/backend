import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { SurveyQuestion } from 'src/surveys/questions/entities/question.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'question_answers' })
export class QuestionAnswer extends CommonEntity {
  @Field(() => SurveyQuestion, { nullable: true })
  @ManyToOne(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.answers, { onDelete: 'CASCADE' })
  public question: SurveyQuestion;

  @Field(() => SurveyQuestion, { nullable: true })
  @OneToOne(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.answer, { onDelete: 'CASCADE' })
  public summaryQuestion: SurveyQuestion;

  @Field({ nullable: true })
  @Column({ length: 225, nullable: true })
  public text: string;
}

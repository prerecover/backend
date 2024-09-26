import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { QuestionAnswer } from 'src/surveys/answers/entities/answer.entity';
import { Survey } from 'src/surveys/entities/survey.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'survey_questions' })
export class SurveyQuestion extends CommonEntity {
  @Field(() => Survey, { nullable: true })
  @ManyToOne(() => Survey, (survey) => survey.questions, { onDelete: 'CASCADE' })
  public survey: Survey;

  @Field(() => [QuestionAnswer], { nullable: true })
  @OneToMany(() => QuestionAnswer, (questionAnswer) => questionAnswer.question)
  public answers: QuestionAnswer[];

  @Field(() => QuestionAnswer, { nullable: true })
  @JoinColumn()
  @OneToOne(() => QuestionAnswer, (answer) => answer.summaryQuestion, { onDelete: 'SET NULL' })
  public answer: QuestionAnswer;

  @Field({ nullable: true })
  @Column({ length: 225, nullable: true })
  public text: string;
}

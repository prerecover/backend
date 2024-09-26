import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysResolver } from './surveys.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { QuestionAnswer } from './answers/entities/answer.entity';
import { SurveyQuestion } from './questions/entities/question.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, QuestionAnswer, SurveyQuestion, Appointment]),
    AppointmentsModule,
    NotificationsModule,
    QuestionsModule,
    AnswersModule,
  ],
  providers: [SurveysResolver, SurveysService],
})
export class SurveysModule {}

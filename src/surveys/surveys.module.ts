import { forwardRef, Module } from '@nestjs/common';
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
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/config/bull/queue.interface';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { HistoryStudyConsumer } from './surveys.consumer';

@Module({
    imports: [
        TypeOrmModule.forFeature([Survey, QuestionAnswer, SurveyQuestion, Appointment, User]),
        forwardRef(() => AppointmentsModule),
        NotificationsModule,
        BullModule.registerQueue({ name: QUEUE_NAME.historyStudy }),
        QuestionsModule,
        UsersModule,
        NotificationsModule,
        AnswersModule,
    ],
    providers: [SurveysResolver, SurveysService, HistoryStudyConsumer],
    exports: [SurveysService],
})
export class SurveysModule {}

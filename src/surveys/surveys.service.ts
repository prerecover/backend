import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';
import { SurveyQuestion } from './questions/entities/question.entity';
import { QuestionAnswer } from './answers/entities/answer.entity';
import { SurveyCompleteInput, SurveyInput } from './dto/survey.dto';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { NotificationsService } from 'src/notifications/notifications.service';
import { LokiLogger } from 'nestjs-loki-logger';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/config/bull/queue.interface';
import { Queue } from 'bull';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SurveysService {
    constructor(
        @InjectRepository(Survey)
        private readonly surveyRepository: Repository<Survey>,
        @InjectRepository(SurveyQuestion)
        private readonly questionRepository: Repository<SurveyQuestion>,
        @InjectRepository(QuestionAnswer)
        private readonly answerRepository: Repository<QuestionAnswer>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        private readonly notificationService: NotificationsService,
        @InjectQueue(QUEUE_NAME.historyStudy) private historyStudyQueue: Queue,
    ) {}
    private readonly logger = new LokiLogger(SurveysService.name);

    async completeSurvey(surveyData: SurveyCompleteInput[], surveyId: string, userId: string) {
        const survey = await this.surveyRepository.findOneBy({ _id: surveyId });
        survey.passed = true;
        surveyData.map(async (surveyInput) => {
            const question = await this.questionRepository.findOne({ where: { text: surveyInput.questionTitle } });
            question.answer = await this.answerRepository.findOne({ where: { text: surveyInput.answerTitle } });
            await this.questionRepository.save(question);
        });
        const user = await this.userRepository.findOneBy({ _id: userId });
        user.historyStudied = true;
        await this.userRepository.save(user);
        await this.notificationService.create({ userId, text: 'Вся ваша история изучается' });
        await this.surveyRepository.save(survey);
        await this.historyStudyQueue.add('historyStudyReset', { userId }, { delay: 60000 * 24 });
        return true;
    }

    async createSurvey(surveyInput: SurveyInput) {
        const surveyAppointment = await this.appointmentRepository.findOne({
            where: { title: surveyInput.title },
            relations: { user: true },
        });
        const survey = this.surveyRepository.create({ appointment: surveyAppointment });
        const createdSurvey = await this.surveyRepository.save(survey);
        this.logger.log(`Создан новый опрос - ${createdSurvey.appointment}`);

        surveyInput.questions.forEach(async (question) => {
            const { answers: questionAnswers, text: questionText } = question;
            let createdQuestion = this.questionRepository.create({ text: questionText });
            createdQuestion.survey = createdSurvey;
            createdQuestion = await this.questionRepository.save(createdQuestion);
            this.logger.log(`Добавлен новый вопрос - ${createdQuestion.text} на опрос - ${createdQuestion.survey}`);
            questionAnswers.forEach(async (answer) => {
                const createdAnswer = this.answerRepository.create({ text: answer.text, question: createdQuestion });
                await this.answerRepository.save(createdAnswer);
                this.logger.log(`Добавлен новый ответ - ${createdAnswer.text} на вопрос - ${createdQuestion.text}`);
            });
        });
        await this.notificationService.create({ userId: surveyAppointment.user._id, text: 'Пройдите опрос от врача' });
        this.logger.log('Отправлено уведомление пользователю о новом опросе');
        return createdSurvey;
    }

    async findByAppointment(appointmentId: string) {
        return await this.surveyRepository.findOne({
            where: { appointment: { _id: appointmentId } },
            relations: { questions: true },
        });
    }
    async appointmentsForSurvey(surveyId: string) {
        return await this.appointmentRepository.findOne({
            where: { survey: { _id: surveyId } },
            relations: { user: true, clinic: true, doctor: true, service: true },
        });
    }

    async findByUser(userId: string) {
        return await this.surveyRepository.find({
            relations: { questions: true, appointment: true },
            where: { appointment: { user: { _id: userId } } },
        });
    }
    async findAll(args?: PaginateArgs): Promise<Survey[]> {
        return await this.surveyRepository.find({
            relations: { questions: true, appointment: true },
            take: args.take,
            skip: args.skip,
        });
    }
}

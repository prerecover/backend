import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { In, Repository } from 'typeorm';
import { SurveyQuestion } from './questions/entities/question.entity';
import { QuestionAnswer } from './answers/entities/answer.entity';
import { SurveyInput } from './dto/survey.dto';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(SurveyQuestion)
    private readonly questionRepository: Repository<SurveyQuestion>,
    @InjectRepository(QuestionAnswer)
    private readonly answerRepository: Repository<QuestionAnswer>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly notificationService: NotificationsService,
  ) {}

  async createSurvey(surveyInput: SurveyInput) {
    const surveyAppointment = await this.appointmentRepository.findOne({
      where: { title: surveyInput.title },
      relations: { user: true },
    });
    const survey = this.surveyRepository.create({ appointment: surveyAppointment });
    const createdSurvey = await this.surveyRepository.save(survey);

    surveyInput.questions.forEach(async (question) => {
      const { answers: questionAnswers, text: questionText } = question;
      let createdQuestion = this.questionRepository.create({ text: questionText });
      createdQuestion.survey = createdSurvey;
      createdQuestion = await this.questionRepository.save(createdQuestion);
      questionAnswers.forEach(async (answer) => {
        const createdAnswer = this.answerRepository.create({ text: answer.text, question: createdQuestion });
        await this.answerRepository.save(createdAnswer);
      });
    });
    await this.notificationService.create({ userId: surveyAppointment.user._id, text: 'Пройдите опрос от врача' });
    return createdSurvey;
  }
  async appointmentsForSurvey(surveyId: string) {
    return await this.appointmentRepository.findOne({
      where: { surveys: { _id: surveyId } },
      relations: { user: true, clinic: true, doctor: true, service: true },
    });
  }
  async findAll(args?: PaginateArgs): Promise<Survey[]> {
    return await this.surveyRepository.find({
      relations: { questions: true },
      take: args.take,
      skip: args.skip,
    });
  }
}

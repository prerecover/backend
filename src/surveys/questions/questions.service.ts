import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestionAnswer } from '../answers/entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionAnswer)
    private readonly answersReposirory: Repository<QuestionAnswer>,
  ) {}
  async answersForQuestion(questionId: string) {
    return await this.answersReposirory.find({
      where: { question: { _id: questionId } },
      relations: { question: true },
    });
  }
}

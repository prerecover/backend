import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersResolver } from './answers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionAnswer } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionAnswer])],
  providers: [AnswersResolver, AnswersService],
})
export class AnswersModule {}

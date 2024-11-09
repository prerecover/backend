import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SurveysService } from './surveys.service';
import { Survey } from './entities/survey.entity';
import { SurveyCompleteInput, SurveyInput } from './dto/survey.dto';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Survey)
export class SurveysResolver {
    constructor(private readonly surveysService: SurveysService) {}

    @Mutation(() => Survey)
    async createSurvey(@Args('surveyInput') surveyInput: SurveyInput): Promise<Survey> {
        return await this.surveysService.createSurvey(surveyInput);
    }
    @UseGuards(AuthGuard)
    @Mutation(() => Boolean)
    async completeSurvey(
        @CurrentUser() user: User,
        @Args({ name: 'surveyId' }) surveyId: string,
        @Args({ name: 'surveyCompleteInput', type: () => [SurveyCompleteInput] })
        surveyData: SurveyCompleteInput[],
    ) {
        console.log(user._id, surveyId, surveyData);
        return await this.surveysService.completeSurvey(surveyData, surveyId, user._id);
    }

    @Query(() => [Survey], { name: 'surveys' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return await this.surveysService.findAll(args);
    }

    @Query(() => Survey, { name: 'surveyByAppointment' })
    async findByAppointment(@Args('appointmentId') _id: string) {
        return await this.surveysService.findByAppointment(_id);
    }
    @UseGuards()
    @Query(() => [Survey], { name: 'surveysByUser' })
    async findByUser(@CurrentUser() user?: User) {
        return await this.surveysService.findByUser(user._id);
    }
    @ResolveField('appointment', () => Appointment)
    async appointment(@Parent() survey: Survey) {
        const { _id: surveyId } = survey;
        return await this.surveysService.appointmentsForSurvey(surveyId);
    }
}

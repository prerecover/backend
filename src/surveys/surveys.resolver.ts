import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SurveysService } from './surveys.service';
import { Survey } from './entities/survey.entity';
import { SurveyInput } from './dto/survey.dto';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Survey)
export class SurveysResolver {
    constructor(private readonly surveysService: SurveysService) {}

    @Mutation(() => Survey)
    async createSurvey(@Args('surveyInput') surveyInput: SurveyInput): Promise<Survey> {
        return await this.surveysService.createSurvey(surveyInput);
    }

    @Query(() => [Survey], { name: 'surveys' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return await this.surveysService.findAll(args);
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

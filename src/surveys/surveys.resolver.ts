import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SurveysService } from './surveys.service';
import { Survey } from './entities/survey.entity';
import { SurveyInput } from './dto/survey.dto';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Appointment } from 'src/appointments/entities/appointment.entity';

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
    @ResolveField('appointment', () => Appointment)
    async appointment(@Parent() survey: Survey) {
        const { _id: surveyId } = survey;
        return await this.surveysService.appointmentsForSurvey(surveyId);
    }
}

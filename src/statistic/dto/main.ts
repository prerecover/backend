import { Field, ObjectType } from '@nestjs/graphql';
import { AppointmentStats } from './appointment-stats';
import { ClinicStats } from './clinic-stats';
import { UsersStats } from './users-stats';

@ObjectType()
export class StatsOutput {
    @Field()
    public appointments: AppointmentStats;

    @Field()
    public clinics: ClinicStats;

    @Field()
    public users: UsersStats;
}

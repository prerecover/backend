import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminStats {
    @Field()
    public inProcessAppointments: number;

    @Field()
    public approovedAppointments: number;

    @Field()
    public pendingAppointments: number;

    @Field()
    public inProcessSurveys: number;
}

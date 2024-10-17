import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CalendarStats {
    @Field()
    public changeByCompany: number;

    @Field()
    public changeByClinic: number;

    @Field()
    public visitCalendar: number;

    @Field()
    public noVisitCalendar: number;

    @Field()
    public inProcessAppointments: number;
}

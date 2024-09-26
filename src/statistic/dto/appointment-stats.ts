import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AppointmentStats {
    @Field()
    public totalAppointments: number;

    @Field()
    public completedAppointments: number;

    @Field()
    public acceptedAppointments: number;

    @Field()
    public rejectedAppointments: number;
}

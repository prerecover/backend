import { InputType, Field } from '@nestjs/graphql';

@InputType()
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

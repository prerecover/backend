import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ClinicStats{
    @Field()
    public totalClinics: number;

    @Field()
    public completedAppointments: number;

    @Field()
    public acceptedAppointments: number;

    @Field()
    public rejectedAppointments: number;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@ObjectType()
export class History {
    @Field(() => [Appointment])
    public appointments: Appointment[];

    @Field(() => [Doctor])
    public doctors: Doctor[];

    @Field(() => [Clinic])
    public clinics: Clinic[];
}

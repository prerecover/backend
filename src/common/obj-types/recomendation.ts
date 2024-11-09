import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { Survey } from 'src/surveys/entities/survey.entity';

@ObjectType()
export class Recomendation {
    @Field(() => Appointment)
    public service: Service;

    @Field(() => Survey)
    public clinic: Clinic;

    @Field(() => Doctor)
    public doctor: Doctor;
}

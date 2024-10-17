import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Survey } from 'src/surveys/entities/survey.entity';

@ObjectType()
export class History {
    @Field(() => [Appointment])
    public appointments: Appointment[];

    @Field(() => [Survey])
    public surveys: Survey[];
}

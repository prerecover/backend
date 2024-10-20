import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { SurveyQuestion } from '../questions/entities/question.entity';

@ObjectType()
@Entity({ name: 'surveys' })
export class Survey extends CommonEntity {
    @Field(() => Appointment, { nullable: true })
    @OneToOne(() => Appointment, (appointment) => appointment.survey, { onDelete: 'CASCADE' })
    public appointment: Appointment;

    @Field(() => [SurveyQuestion], { nullable: true })
    @OneToMany(() => SurveyQuestion, (question) => question.survey, { nullable: true })
    public questions: SurveyQuestion[];

    @Field()
    @Column({ default: false })
    public passed: boolean;
}

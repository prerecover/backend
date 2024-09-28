import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { SurveyQuestion } from '../questions/entities/question.entity';

@ObjectType()
@Entity({ name: 'surveys' })
export class Survey extends CommonEntity {
    @Field(() => Appointment, { nullable: true })
    @ManyToOne(() => Appointment, (appointment) => appointment.surveys, { onDelete: 'CASCADE' })
    public appointment: Appointment;

    @Field(() => [SurveyQuestion], { nullable: true })
    @OneToMany(() => SurveyQuestion, (question) => question.survey)
    public questions: SurveyQuestion[];

    @Field()
    @Column({ default: false })
    public passed: boolean;
}

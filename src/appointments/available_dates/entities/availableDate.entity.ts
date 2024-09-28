import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'available_dates' })
export class AvailableDate extends CommonEntity {
    @Field(() => Appointment, { nullable: true })
    @ManyToOne(() => Appointment, (appointment) => appointment.availableDates, { onDelete: 'CASCADE' })
    public appointment: Appointment;

    @Field()
    @Column({ type: 'timestamp with time zone' })
    public date: Date;
}

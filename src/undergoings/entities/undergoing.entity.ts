import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Saved } from 'src/saved/entities/saved.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'undergoings' })
export class Undergoing extends CommonEntity {
    @Field(() => Float)
    @Column({ type: 'float', default: 5 })
    public rating: number;

    @ManyToOne(() => Appointment, (appointment) => appointment.undergoings, { onDelete: 'CASCADE' })
    public appointment: Appointment;

    @OneToMany(() => Saved, (saved) => saved.undergoing, { nullable: true })
    public saved: Saved[];
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'user_details' })
export class UserDetail {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    public readonly _id: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public height: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public weight: number;

    @Field({ nullable: true })
    @Column({ name: 'pressure_start', nullable: true })
    public pressureStart: number;

    @Field({ nullable: true })
    @Column({ name: 'pressure_end', nullable: true })
    public pressureEnd: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public oxygen: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public pulse: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public allergey: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public sleepTime: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public temperature: number;

    @OneToOne(() => User, (user) => user.detail, { onDelete: 'CASCADE' })
    @JoinColumn()
    public user: User;
}

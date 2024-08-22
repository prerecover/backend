import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { Column, CreateDateColumn, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'links' })
export class Link extends CommonEntity {

    @Field()
    @Column({ name: 'clinic_email' })
    public clinicEmail: string

    @Field()
    @CreateDateColumn({ name: 'expired_at', type: 'timestamp with time zone' })
    public expiredAt: Date;

    @Field()
    @Column({ default: false })
    public isUsed: boolean;


}

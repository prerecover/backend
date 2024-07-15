import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate } from 'class-validator';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType({ isAbstract: true })
export abstract class CommonEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    public readonly _id: string;

    @IsDate()
    @Field({ description: 'Created at timestamp' })
    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
    public readonly createdAt: Date;

    @IsDate()
    @Field({ description: 'Updated at timestamp' })
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
    public updatedAt: Date;
}

import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { RegisterDoctorInput } from './doctor-input';
import { FileUpload } from 'src/common/shared/file.interface';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { PAYMENT_METHOD } from 'src/services/entities/service.entity';
@InputType()
export class RegisterServiceInput {
    @Field()
    public title: string;

    @Field({nullable: true, defaultValue: false})
    public online: boolean;

    @Field({nullable: true, defaultValue: false})
    public offline: boolean;

    @Field()
    public category: string;
    
    @Field(() => [String || null])
    public paymentMethods: PAYMENT_METHOD[];

    @Field(() => GraphQLUpload, { nullable: true })
    avatar: Promise<FileUpload>;

    @Field()
    public description: string;


    @Field(() => Int, { nullable: true })
    public durationMin: number;

    @Field(() => Int, { nullable: true })
    public durationMax: number;

    @Field(() => Float, { nullable: true })
    public priceMin: number;

    @Field(() => Float, { nullable: true })
    public priceMax: number;

    @Field(() => [RegisterDoctorInput])
    public doctors: RegisterDoctorInput[];
}

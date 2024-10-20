import { InputType, Field } from '@nestjs/graphql';
import { RegisterServiceInput } from './service-input';

// import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
// import { FileUpload } from 'src/common/shared/file.interface';
// import { IsEmail } from 'class-validator';
@InputType()
export class RegisterClinicInput {
    @Field()
    public title: string;

    @Field()
    public adminNumber: string;

    @Field({ nullable: true })
    public site: string;

    @Field()
    public countryName: string;

    @Field({ nullable: true })
    public calendar: string;

    @Field()
    public city: string;

    @Field({ nullable: true })
    // @IsEmail({})
    public email: string;

    @Field()
    public card: string;

    @Field()
    public address: string;

    // @Field(() => GraphQLUpload, { nullable: true })
    // avatar: Promise<FileUpload>;

    @Field()
    public workdays: string;

    @Field()
    public startTime: number;

    @Field()
    public endTime: number;

    @Field(() => [RegisterServiceInput])
    public services: RegisterServiceInput[];
}

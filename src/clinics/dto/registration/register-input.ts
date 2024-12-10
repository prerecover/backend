import { InputType, Field } from '@nestjs/graphql';
import { RegisterServiceInput } from './service-input';

// import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
// import { FileUpload } from 'src/common/shared/file.interface';
@InputType()
export class RegisterClinicInput {
    @Field()
    public title: string;

    @Field()
    public typeTitle: string;

    @Field()
    public age: number;

    @Field()
    public square: number;

    @Field()
    public numberOfFloors: number;

    @Field()
    public totalServices: number;

    @Field()
    public totalDoctors: number;

    @Field()
    public adminNumber: string;

    @Field()
    public countryName: string;

    @Field(() => [String || null])
    public numbers: string[];

    @Field()
    public registryNumber: string;

    @Field()
    public language: string;

    @Field()
    public computerHave: boolean;

    @Field()
    public elevatorHave: boolean;

    @Field()
    public internetHave: boolean;

    @Field({ nullable: true })
    public mondayTime: string;

    @Field({ nullable: true })
    public tuesdayTime: string;

    @Field({ nullable: true })
    public wednesdayTime: string;

    @Field({ nullable: true })
    public thursdayTime: string;

    @Field({ nullable: true })
    public fridayTime: string;

    @Field({ nullable: true })
    public saturdayTime: string;

    @Field({ nullable: true })
    public sundayTime: string;

    @Field()
    public city: string;

    @Field()
    public address: string;

    // @Field(() => GraphQLUpload, { nullable: true })
    // avatar: Promise<FileUpload>;
    @Field(() => [RegisterServiceInput])
    public services: RegisterServiceInput[];
}

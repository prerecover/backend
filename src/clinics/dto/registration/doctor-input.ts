import { InputType, Field, Float } from '@nestjs/graphql';
import { FileUpload } from 'src/common/shared/file.interface';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class RegisterDoctorInput {
    @Field()
    public firstName: string;

    @Field()
    public lastName: string;

    @Field()
    public surname: string;

    @Field()
    public specialization: string;

    @Field(() => GraphQLUpload, { nullable: true })
    img: Promise<FileUpload>;

    @Field(() => Float)
    public workExp: number;
}

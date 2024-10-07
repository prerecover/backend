import { InputType, Field } from '@nestjs/graphql';
import { MaxLength, MinLength, IsEmail, IsPhoneNumber } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/common/shared/file.interface';

@InputType()
export class CreateUserInput {
    @MaxLength(30)
    @MinLength(2)
    @Field({ nullable: true })
    login: string;

    @MaxLength(30)
    @MinLength(2)
    @Field({ nullable: true })
    firstName: string;

    @IsPhoneNumber('UZ')
    @Field({ nullable: true })
    number: string;

    @Field(() => GraphQLUpload, { nullable: true })
    avatar: Promise<FileUpload>;

    @Field({ description: "User's gender", nullable: true })
    sex: boolean;

    @MaxLength(30)
    @MinLength(2)
    @Field()
    lastName: string;

    @IsEmail()
    @MaxLength(225)
    @Field()
    email: string;

    @Field({ nullable: true })
    birthday: Date;
}

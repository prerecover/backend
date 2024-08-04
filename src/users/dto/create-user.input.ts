import { InputType, Field, HideField } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength, IsStrongPassword, IsEmail, Validate, IsPhoneNumber } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/common/shared/file.interface';

@InputType()
export class CreateUserInput {
    @IsNotEmpty()
    @MaxLength(30)
    @MinLength(2)
    @Field({ nullable: true })
    login: string;

    @IsNotEmpty()
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

    @IsNotEmpty()
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

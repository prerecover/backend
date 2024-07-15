import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength, IsStrongPassword, IsEmail, Validate } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/common/shared/file.interface';
import { IsUnique } from 'src/common/shared/unique.validator';

@InputType()
export class CreateUserInput {
    @IsNotEmpty()
    @MaxLength(30)
    @MinLength(2)
    @Validate(IsUnique, ['users', 'login'])
    @Field()
    login: string;

    @IsNotEmpty()
    @MaxLength(30)
    @MinLength(2)
    @Field()
    firstName: string;

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

    @IsStrongPassword()
    @Field()
    password: string;
}

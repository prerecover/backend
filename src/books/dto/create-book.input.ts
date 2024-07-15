import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength, Validate } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/common/shared/file.interface';
import { IsUnique } from 'src/common/shared/unique.validator';

@InputType()
export class CreateBookInput {
    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(2)
    @Validate(IsUnique, ['books', 'title'])
    public title: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    public summary: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(8000)
    public description: string;

    @Field({ defaultValue: false, nullable: true })
    public isDraft: boolean;

    @Field(() => GraphQLUpload, { nullable: true })
    public file: Promise<FileUpload>;
}

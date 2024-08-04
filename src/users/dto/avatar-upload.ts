import { FileUpload } from 'src/common/shared/file.interface';
import { InputType, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class AvatarUpload {
    @Field(() => GraphQLUpload, { nullable: true })
    avatar: Promise<FileUpload>;
}

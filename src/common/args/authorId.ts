import { ArgsType, Field } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { IsExist } from 'src/common/shared/exist.validator';

@ArgsType()
export class AuthorId {
    @Field()
    @Validate(IsExist, ['users', '_id'])
    authorId: string;
}

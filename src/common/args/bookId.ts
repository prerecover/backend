import { ArgsType, Field } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { IsExist } from 'src/common/shared/exist.validator';

@ArgsType()
export class BookId {
    @Field()
    @Validate(IsExist, ['books', '_id'])
    bookId: string;
}

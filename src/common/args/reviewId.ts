import { ArgsType, Field } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { IsExist } from 'src/common/shared/exist.validator';

@ArgsType()
export class ReviewId {
    @Field()
    @Validate(IsExist, ['reviews', '_id'])
    reviewId: string;
}

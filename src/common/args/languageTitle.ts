import { ArgsType, Field } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { IsExist } from 'src/common/shared/exist.validator';

@ArgsType()
export class LanguageTitle {
    @Field()
    @Validate(IsExist, ['languages', 'title'])
    languageTitle: string;
}

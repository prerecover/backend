import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Validate } from 'class-validator';
import { IsUnique } from 'src/common/shared/unique.validator';

@InputType()
export class RegistrationUser {
    @Field()
    @Validate(IsUnique, ['users', 'email'])
    @IsEmail()
    public email: string;

    @Field()
    public password: string;
}

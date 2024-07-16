import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class NewPasswordInput {
    @IsEmail()
    @Field()
    public email: string;

    @Field()
    public password: string;
}

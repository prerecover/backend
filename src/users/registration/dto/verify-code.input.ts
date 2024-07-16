import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class VerifyCodeInput {
    @Field()
    @IsEmail()
    public email: string;

    @Field()
    public code: number;
}

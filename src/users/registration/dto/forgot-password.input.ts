import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    public email: string;

    @Field({ nullable: true })
    @IsOptional()
    public number: number;
}

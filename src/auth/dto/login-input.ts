import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class LoginInput {
    @Field({ nullable: true })
    @IsOptional()
    public number: string;

    @Field({ nullable: true })
    @IsEmail()
    @IsOptional()
    public email: string;

    @Field()
    @IsOptional()
    public password: string;
}

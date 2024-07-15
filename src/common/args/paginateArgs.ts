import { Field, Int, ArgsType } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@ArgsType()
export class PaginateArgs {
    @Field(() => Int)
    @Min(0)
    @IsOptional()
    public skip = 0;

    @Field(() => Int)
    @Min(1)
    @IsOptional()
    @Max(50)
    public take = 25;
}

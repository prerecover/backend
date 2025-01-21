import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';

@Injectable()
export class GqlConfig implements GqlOptionsFactory {
    createGqlOptions(): ApolloDriverConfig {
        return { 
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            playground: true, 
            debug: true,
            buildSchemaOptions: {
                numberScalarMode: 'integer',
            },
            context: (ctx) => ctx,
        };
    }
}

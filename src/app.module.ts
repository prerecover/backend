import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './common/itc/timeout.itc';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { DataSource } from 'typeorm';
import { S3Module } from 'nestjs-s3';
import { S3Config, TypeOrmCfgService, GqlConfig } from './config';
import { MinioService } from './config/s3/minio.service';
import { IsUnique } from './common/shared/unique.validator';
import { CountriesModule } from './countries/countries.module';
import { LanguagesModule } from './languages/languages.module';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { LikesModule } from './likes/likes.module';
import { ReviewsModule } from './reviews/reviews.module';
import { IsExist } from './common/shared/exist.validator';
import { FavoritesModule } from './favorites/favorites.module';
import * as path from 'path';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useClass: GqlConfig,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '/i18n/'),
                watch: true,
            },
            resolvers: [
                { use: QueryResolver, options: ['lang'] },
                AcceptLanguageResolver,
                new HeaderResolver(['x-lang']),
            ],
        }),

        TypeOrmModule.forRootAsync({
            useClass: TypeOrmCfgService,
            async dataSourceFactory(options) {
                if (!options) {
                    throw new Error('Invalid options passed');
                }
                return addTransactionalDataSource(new DataSource(options));
            },
        }),
        S3Module.forRootAsync({
            useClass: S3Config,
        }),
        UsersModule,
        CountriesModule,
        LanguagesModule,
        CategoriesModule,
        BooksModule,
        LikesModule,
        ReviewsModule,
        FavoritesModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor,
        },
        IsUnique,
        IsExist,
        AppService,
        MinioService,
    ],
})
export class AppModule {}

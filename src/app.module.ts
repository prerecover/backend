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
import { DataSource } from 'typeorm';
import { S3Module } from 'nestjs-s3';
import { S3Config, TypeOrmCfgService, GqlConfig } from './config';
import { MinioService } from './config/s3/minio.service';
import { IsUnique } from './common/shared/unique.validator';
import { CountriesModule } from './countries/countries.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { IsExist } from './common/shared/exist.validator';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { LikesModule } from './likes/likes.module';
import { NewsModule } from './news/news.module';
import { SavedModule } from './saved/saved.module';
import { ClinicsModule } from './clinics/clinics.module';
import { DoctorsModule } from './doctors/doctors.module';

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

        TypeOrmModule.forRootAsync({
            useClass: TypeOrmCfgService,
            dataSourceFactory: async (options) => {
                const dataSource = await new DataSource(options).initialize();
                return dataSource;
            },
        }),
        S3Module.forRootAsync({
            useClass: S3Config,
        }),
        UsersModule,
        CountriesModule,
        ServicesModule,
        AppointmentsModule,
        LikesModule,
        NewsModule,
        SavedModule,
        ClinicsModule,
        DoctorsModule,
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
export class AppModule { }

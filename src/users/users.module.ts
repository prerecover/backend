import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DateScalar } from 'src/common/shared/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MinioService } from 'src/config/s3/minio.service';
import { Country } from 'src/countries/entities/country.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Country])],
    providers: [UsersResolver, UsersService, DateScalar, MinioService],
})
export class UsersModule { }

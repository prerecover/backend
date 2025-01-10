import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { DateScalar } from 'src/common/shared/date.scalar';
import { MinioService } from 'src/config/s3/minio.service';
import { Country } from 'src/countries/entities/country.entity';
import { SavedModule } from 'src/saved/saved.module';
import { User } from './entities/user.entity';
import { UserDetail } from './entities/userDetail.entity';
import { RegistrationModule } from './registration/registration.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Country, Appointment, UserDetail]), RegistrationModule, SavedModule],
    providers: [UsersResolver, UsersService, DateScalar, MinioService],
    exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DateScalar } from 'src/common/shared/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MinioService } from 'src/config/s3/minio.service';
import { Country } from 'src/countries/entities/country.entity';
import { RegistrationModule } from './registration/registration.module';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Country, Appointment]), RegistrationModule],
    providers: [UsersResolver, UsersService, DateScalar, MinioService],
    exports: [UsersService],
})
export class UsersModule {}

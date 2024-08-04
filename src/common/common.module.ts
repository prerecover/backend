import { Module } from '@nestjs/common';
import { CommonResolver } from './common.resolver';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Clinic, Doctor, Service, Appointment]), UsersModule],
    providers: [CommonResolver, CommonService],
})
export class CommonModule {}

import { Module } from '@nestjs/common';
import { CommonResolver } from './common.resolver';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { UsersModule } from 'src/users/users.module';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Survey } from 'src/surveys/entities/survey.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Clinic, Doctor, Service, Appointment, Survey]), UsersModule],
    providers: [CommonResolver, CommonService],
})
export class CommonModule {}

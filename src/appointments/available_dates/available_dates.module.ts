import { Module } from '@nestjs/common';
import { AvailableDatesService } from './available_dates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../entities/appointment.entity';
import { AvailableDate } from './entities/availableDate.entity';
import { AvailableDateResolver } from './available_dates.resolver';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
    imports: [TypeOrmModule.forFeature([Appointment, AvailableDate]), NotificationsModule],
    providers: [AvailableDatesService, AvailableDateResolver],
})
export class AvailableDatesModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvailableDate } from './entities/availableDate.entity';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class AvailableDatesService {
    constructor(
        @InjectRepository(AvailableDate)
        private readonly datesRepository: Repository<AvailableDate>,
        @InjectRepository(Appointment)
        private readonly appointmentsRepository: Repository<Appointment>,
        private readonly notificationService: NotificationsService,
    ) {}

    async setDates(appointmentId: string, dates: Date[]): Promise<boolean> {
        const appointment = await this.appointmentsRepository.findOne({
            where: { _id: appointmentId },
            relations: { user: true },
        });
        appointment.status = 'Pending';
        await this.appointmentsRepository.save(appointment);
        dates.forEach(async (date) => {
            const availableDate = this.datesRepository.create({ appointment, date });
            await this.datesRepository.save(availableDate);
        });
        this.notificationService.create({
            userId: appointment.user._id,
            text: `Запись “${appointment.title || 'Без названия'}” отклонена, выберите другой день`,
        });
        return true;
    }

    async getDates(appointmentId: string): Promise<AvailableDate[]> {
        return await this.datesRepository.find({ where: { appointment: { _id: appointmentId } } });
    }
}

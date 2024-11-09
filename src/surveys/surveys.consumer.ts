import { Process, Processor } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/config/bull/queue.interface';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { NotificationsService } from 'src/notifications/notifications.service';

interface historyStudy {
    userId: string;
}
@Processor(QUEUE_NAME.historyStudy)
export class HistoryStudyConsumer {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly notificationService: NotificationsService,
    ) {}

    @Process('historyStudyReset')
    async historyStudyReset(job: Job<historyStudy>) {
        const { data } = job;
        const user = await this.userRepository.findOneBy({ _id: data.userId });
        user.historyStudied = false;
        await this.userRepository.save(user);
        this.notificationService.create({
            userId: data.userId,
            text: 'Конец изучения',
        });
    }
}

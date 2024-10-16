import { Injectable } from '@nestjs/common';
import { CreateNotificationInput } from './dto/create-notification.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { PusherService } from 'nestjs-pusher';
import { LokiLogger } from 'nestjs-loki-logger';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationsRepository: Repository<Notification>,
        private readonly pusherService: PusherService,
    ) {}
    private readonly logger = new LokiLogger(NotificationsService.name);
    async create(createNotificationInput: CreateNotificationInput) {
        const createdNotification = this.notificationsRepository.create({
            text: createNotificationInput.text,
            user: { _id: createNotificationInput.userId },
        });

        this.logger.log(
            `Отправлено уведомление - ${createdNotification.text}, Пользователю - ${createdNotification.user}`,
        );
        const notification = await this.notificationsRepository.save(createdNotification);
        this.pusherService.trigger(createNotificationInput.userId, 'notification', notification);
        return notification;
    }

    async findAll(args?: PaginateArgs) {
        return await this.notificationsRepository.find({ take: args.take, skip: args.skip });
    }

    async findByUser(userId: string) {
        return await this.notificationsRepository.findBy({ user: { _id: userId } });
    }

    async setAsRead(notificationId: string) {
        const notification = await this.notificationsRepository.findOneBy({ _id: notificationId });
        notification.isRead = true;
        this.logger.log(`Уведомление прочитано - ${notification.text}`);
        return await this.notificationsRepository.save(notification);
    }

    findOne(id: number) {
        return `This action returns a #${id} notification`;
    }

    remove(id: number) {
        return `This action removes a #${id} notification`;
    }
}

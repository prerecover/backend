import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Notification } from './entities/notification.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Notification, User])],
    providers: [NotificationsResolver, NotificationsService],
    exports: [NotificationsService],
})
export class NotificationsModule {}

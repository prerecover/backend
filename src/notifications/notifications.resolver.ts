import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/common/shared/user.decorator';

@Resolver(() => Notification)
export class NotificationsResolver {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Mutation(() => Notification)
    async createNotification(@Args('createNotificationInput') createNotificationInput: CreateNotificationInput) {
        return await this.notificationsService.create(createNotificationInput);
    }

    @Query(() => [Notification], { name: 'notifications' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return this.notificationsService.findAll(args);
    }

    @Mutation(() => Notification)
    async setAsRead(@Args('notificationId') notificationId: string) {
        return await this.notificationsService.setAsRead(notificationId);
    }

    @Query(() => [Notification], { name: 'notificationsByUser' })
    async findByUser(@CurrentUser() user: User) {
        console.log(user);
        return await this.notificationsService.findByUser(user._id);
    }
    @Query(() => Notification, { name: 'notification' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.notificationsService.findOne(id);
    }

    @Mutation(() => Notification)
    removeNotification(@Args('id', { type: () => Int }) id: number) {
        return this.notificationsService.remove(id);
    }
}

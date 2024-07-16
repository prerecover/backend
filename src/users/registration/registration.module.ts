import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationResolver } from './registration.resolver';
import { UsersModule } from '../users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/config/bull/queue.interface';
import { MailModule } from 'src/config/smtp/mail.module';
import { MailConsumer } from './registration.consumer';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        TypeOrmModule.forFeature([User]),
        BullModule.registerQueue({ name: QUEUE_NAME.mail }),
        MailModule,
    ],
    providers: [RegistrationResolver, RegistrationService, MailConsumer],
})
export class RegistrationModule {}

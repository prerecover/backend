import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailConsumer } from './mail.consumer';

@Module({
    providers: [MailService, MailConsumer],
    exports: [MailService, MailConsumer],
})
export class MailModule {}

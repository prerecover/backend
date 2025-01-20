import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsConsumer } from './sms.consumer';

@Module({
    providers: [SmsService],
    exports: [SmsService, SmsConsumer],
})
export class SmsModule {}

import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NAME } from '../bull/queue.interface';
import { SmsService } from './sms.service';

interface registrationMessage {
    number: string;
    code: number;
}

@Processor(QUEUE_NAME.sms)
export class SmsConsumer {
    constructor(private smsService: SmsService) {}

    @Process('registrationMessage')
    async sendSmsJob(job: Job<registrationMessage>) {
        console.log('call');
        const { data } = job;
        await this.smsService.registrationMessage(data.number, data.code);
    }

    @Process('forgotPasswordMessage')
    async forgotSmsJob(job: Job<registrationMessage>) {
        console.log('call');
        const { data } = job;
        await this.smsService.forgotPasswordMessage(data.number, data.code);
    }
}

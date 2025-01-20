import { Process, Processor } from '@nestjs/bull';
import { QUEUE_NAME } from '../bull/queue.interface';
import { MailService } from './mail.service';
import { Job } from 'bull';

interface registrationMessage {
    email: string;
    code: number;
}

@Processor(QUEUE_NAME.mail)
export class MailConsumer {
    constructor(private mailService: MailService) {}

    @Process('registrationMessage')
    async sendMailJob(job: Job<registrationMessage>) {
        console.log('call');
        const { data } = job;
        await this.mailService.registrationMessage(data.email, data.code);
    }

    @Process('forgotPasswordMessage')
    async forgotMailJob(job: Job<registrationMessage>) {
        console.log('call');
        const { data } = job;
        await this.mailService.forgotPasswordMessage(data.email, data.code);
    }
}

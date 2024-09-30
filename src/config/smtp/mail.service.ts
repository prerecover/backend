import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { LokiLogger } from 'nestjs-loki-logger';

@Injectable()
export class MailService {
    constructor(private readonly smtpService: MailerService) {}

    private readonly logger = new LokiLogger(MailService.name);

    public async registrationMessage(userEmail: string, code: number) {
        this.logger.log(`Отправлено сообщение о регистрации на почту ${userEmail}`);
        await this.smtpService.sendMail({
            to: userEmail,
            from: process.env.EMAIL_USER,
            subject: 'Регистрация',
            text: 'Спасибо за регистрацию на сайте prerecover.com !',
            html: `<p>Ваш код подтверждения - <b>${code}</b></p>`,
        });
    }

    public async forgotPasswordMessage(userEmail: string, code: number) {
        this.logger.log(`Отправлено сообщение о восстановлении пароля на почту ${userEmail}`);
        await this.smtpService.sendMail({
            to: userEmail,
            from: process.env.EMAIL_USER,
            subject: 'Восстановление пароля',
            text: 'Восстановление пароля на сайте prerecover.com !',
            html: `<p>Ваш код сброса пароля - <b>${code}</b></p>`,
        });
    }
}

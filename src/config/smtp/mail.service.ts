import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly smtpService: MailerService) { }

    private generateCode(): number {
        return Math.floor(1000 + Math.random() * 9000);
    }

    public async registrationMessage(userEmail: string) {
        await this.smtpService.sendMail({
            to: userEmail,
            from: process.env.EMAIL_USER,
            subject: 'Регистрация',
            text: 'Спасибо за регистрацию на сайте prerecover.com !',
            html: `<p>Ваш код подтверждения - <b>${this.generateCode()}</b></p>`,
        });
    }
}

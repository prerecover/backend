import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SMTPConfig implements MailerOptionsFactory {
    createMailerOptions(): MailerOptions {
        const username = process.env.EMAIL_USER;
        const password = process.env.EMAIL_PASSWORD;
        const host = process.env.EMAIL_HOST;
        return {
            transport: `smtps://${username}:${password}@${host}?pool=true`,
            defaults: {
                from: 'prerecovergroup <prerecovergroup@gmail.com>',
            },
        };
    }
}

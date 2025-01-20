import { Injectable } from '@nestjs/common';
import { LokiLogger } from 'nestjs-loki-logger';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class SmsService {
    private readonly smsRoot: string = process.env.SMS_URL;
    private readonly smsLogin: string = process.env.SMS_LOGIN;
    private readonly smsPassword: string = process.env.SMS_PASSWORD;
    private readonly sendSmsUrl: string = `${this.smsRoot}/`;
    private readonly checkStatusSmsUrl: string = `${this.smsRoot}/status/`;
    private readonly logger = new LokiLogger(SmsService.name);
    private payload = {
        login: this.smsLogin,
        password: this.smsPassword,
    };
    private readonly config: AxiosRequestConfig = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
    };

    public async changeAppointmentStatus(number: string, appointmentTitle: string, status: string) {
        await axios.post(
            this.sendSmsUrl,
            { number, text: `Статус вашей записи: ${appointmentTitle} изменен на ${status}` },
            this.config,
        );
        this.logger.log(`Отправлено сообщение о изменении статуса записи на номер ${number}`);
    }

    public async registrationMessage(number: string, code: number) {
        await axios.post(this.sendSmsUrl, { number, text: `Ваш код подтверждения: ${code}` }, this.config);
        this.logger.log(`Отправлено сообщение о регистрации на номер ${number}`);
    }
    public async forgotPasswordMessage(number: string, code: number) {
        await axios.post(this.sendSmsUrl, { number, text: `Ваш код восстановления пароля: ${code}` }, this.config);
        this.logger.log(`Отправлено сообщение о восстановлении пароля на номер ${number}`);
    }
}

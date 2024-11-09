import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationUser } from './dto/registration-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/config/bull/queue.interface';
import { Queue } from 'bull';
import { VerifyCodeInput } from './dto/verify-code.input';
import { UsersService } from '../users.service';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { NewPasswordInput } from './dto/new-password.input';
import * as bcrypt from 'bcrypt';
import { LokiLogger } from 'nestjs-loki-logger';

@Injectable()
export class RegistrationService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectQueue(QUEUE_NAME.mail) private msgQueue: Queue,
        private readonly userService: UsersService,
    ) { }
    private readonly logger = new LokiLogger(RegistrationService.name);
    async createUser(registrationInput: RegistrationUser): Promise<User> {
        const user = this.userRepository.create(registrationInput);
        const code = this.generateCode();
        user.verificationCode = code;
        user.password = await bcrypt.hash(registrationInput.password, 10);
        const resultUser = await this.userRepository.save(user);
        await this.msgQueue.add('registrationMessage', { email: registrationInput.email, code: code });
        this.logger.log(`Создан новый пользователь - ${resultUser.email}`);
        return resultUser;
    }

    async verifyCode(verifyCodeInput: VerifyCodeInput) {
        const user = await this.userService.findOneByEmail(verifyCodeInput.email);
        const isSuccess = user.verificationCode == verifyCodeInput.code;
        if (isSuccess == false) {
            this.logger.error(`Неверный код, ${user.email}`);
            throw new BadRequestException('No valid code');
        }
        user.isVerfied = true;
        await this.userRepository.save(user);
        this.logger.log(`Код подтвержден - ${user.email}`);
        return isSuccess;
    }

    async resendVerifyCode(email: string) {
        const code = this.generateCode();
        await this.setVerificationCode(email, null, code);
        this.logger.log(`Переотправка кода подтверждения регистрации, ${email}`);
        return Boolean(await this.msgQueue.add('registrationMessage', { email: email, code: code }));
    }

    async forgotPassword(forgotPassword: ForgotPasswordInput) {
        if (forgotPassword.email) {
            const code = this.generateCode();
            await this.setVerificationCode(forgotPassword.email, null, code);
            this.logger.log(`Отправка кода сброса пароля - ${forgotPassword.email}`);
            return Boolean(
                await this.msgQueue.add('forgotPasswordMessage', { email: forgotPassword.email, code: code }),
            );
        }
        if (forgotPassword.number) {
            return true;
        }
    }

    async resendForgotCode(email: string) {
        const code = this.generateCode();
        await this.setVerificationCode(email, null, code);
        return Boolean(await this.msgQueue.add('forgotPasswordMessage', { email: email, code: code }));
    }

    async newPassword(newPasswordInput: NewPasswordInput) {
        const user = await this.userService.findOneByEmail(newPasswordInput.email);
        user.password = await bcrypt.hash(newPasswordInput.password, 10);
        this.logger.log(`Установлен новый пароль - ${user.email} - ${newPasswordInput.password}`);
        return Boolean(await this.userRepository.save(user));
    }

    private generateCode(): number {
        return Math.floor(1000 + Math.random() * 9000);
    }
    private async setVerificationCode(email: string, number: string = null, code: number) {
        let user = null;
        if (email) {
            user = await this.userService.findOneByEmail(email);
        }
        if (number) {
            user = await this.userService.findOneByNumber(number);
        }
        user.verificationCode = code;
        return await this.userRepository.save(user);
    }
}

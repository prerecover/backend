import { Inject, Injectable } from '@nestjs/common';
import { RegistrationUser } from './dto/registration-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from 'src/config/smtp/mail.service';

@Injectable()
export class RegistrationService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly mailService: MailService,
    ) { }
    async createUser(registrationInput: RegistrationUser): Promise<User> {
        const user = await this.userRepository.save(this.userRepository.create(registrationInput));
        await this.mailService.registrationMessage(registrationInput.email);
        return user;
    }

    findAll() {
        return `This action returns all registration`;
    }

    findOne(id: number) {
        return `This action returns a #${id} registration`;
    }

    remove(id: number) {
        return `This action removes a #${id} registration`;
    }
}

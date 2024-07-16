import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationResolver } from './registration.resolver';
import { UsersModule } from '../users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { forwardRef } from '@nestjs/common';
import { MailService } from 'src/config/smtp/mail.service';

@Module({
    imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([User])],
    providers: [RegistrationResolver, RegistrationService, MailService],
})
export class RegistrationModule { }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login-input';
import * as bcrypt from 'bcrypt';
import { LokiLogger } from 'nestjs-loki-logger';
import { User } from 'src/users/entities/user.entity';
import { TelegramAuthInput } from './dto/telegram-auth.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtherAuthInput } from './dto/other-auth.input';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    private readonly logger = new LokiLogger(AuthService.name);
    async signIn({ email, number, password }: LoginInput): Promise<any> {
        let user: User = null;
        const payload = {};
        if (email) {
            user = await this.userService.findOneByEmail(email);
            payload['email'] = user.email;
        }
        if (number) {
            user = await this.userService.findOneByNumber(number);
            payload['number'] = user.number;
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            this.logger.log(`Попытка авторизации, неверный пароль: ${user.email} ${password}`);
            throw new UnauthorizedException('No valid password!');
        }

        payload['_id'] = user._id;
        this.logger.log(`Авторизация: ${user.email} ${user.password}`);
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    private async generateCode(): Promise<number> {
        return Math.floor(1000 + Math.random() * 9000);
    }
    async authByOther(authData: OtherAuthInput, key: 'google' | 'vk') {
        const { email, id, name, image } = authData;
        const payload: Record<string, any> = {};

        const idField = key === 'google' ? 'googleId' : 'vkId';
        if (email) {
            const user = await this.userRepository.findOne({ where: { email } });
            if (user) {
                user.avatar = image;
                payload['_id'] = user._id;
                payload['firstName'] = name;
                await this.userRepository.save(user);
            }
        }

        let user = await this.userRepository.findOne({ where: { [idField]: id } });

        if (user) {
            user.firstName = name;
            user.avatar = image;
            payload['_id'] = user._id;
            payload['firstName'] = name;
            await this.userRepository.save(user);
        } else {
            user = this.userRepository.create({
                firstName: name,
                [idField]: id,
                email: email,
                avatar: image,
                password: await bcrypt.hash(id.toString(), 10),
                verificationCode: await this.generateCode(),
            });

            const resultUser = await this.userRepository.save(user);
            this.logger.log(`Создан новый пользователь - ${resultUser.firstName}`);
            payload['_id'] = resultUser._id;
            payload['firstName'] = resultUser.firstName;
        }

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async authByTelegram(tgData: TelegramAuthInput) {
        const { first_name, photo_url, id } = tgData;
        const payload = {};
        const user = await this.userRepository.findOneBy({ telegramId: id });
        if (user) {
            user.firstName = first_name;
            user.avatar = photo_url;
            payload['_id'] = user._id;
            payload['firstName'] = first_name;
            await this.userRepository.save(user);
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } else {
            const user = this.userRepository.create({ firstName: first_name, telegramId: id });
            const code = await this.generateCode();
            user.verificationCode = code;
            user.password = await bcrypt.hash(id.toString(), 10);
            user.avatar = photo_url;
            const resultUser = await this.userRepository.save(user);
            this.logger.log(`Создан новый пользователь - ${resultUser.firstName}`);
            payload['_id'] = user._id;
            payload['firstName'] = user.firstName;
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
    }
}

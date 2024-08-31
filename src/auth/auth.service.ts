import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login-input';
import * as bcrypt from 'bcrypt';
import { LokiLogger } from 'nestjs-loki-logger';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

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
}

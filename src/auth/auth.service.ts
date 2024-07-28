import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login-input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    async signIn({ email, number, password }: LoginInput): Promise<any> {
        let user = null;
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
            throw new UnauthorizedException('No valid password!');
        }

        payload['_id'] = user._id;
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

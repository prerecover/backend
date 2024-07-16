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
        const payload = {
            type: 'user',
        };
        if (email) {
            user = await this.userService.findOneByEmail(email);
            if (user == null) {
                throw new NotFoundException('User with that email not found!');
            }
            payload['email'] = user.email;
        }
        if (number) {
            user = await this.userService.findOneByNumber(number);
            if (user == null) {
                throw new NotFoundException('User with that number not found!');
            }
            payload['number'] = user.number;
        }
        // const comparePassword = await bcrypt.compare(password, user.password);
        // if (!comparePassword) {
        //     throw new UnauthorizedException('No valid password!');
        // }
        console.log(user);
        if (user.password !== password) {
            throw new UnauthorizedException('No valid password!');
        }
        payload['sub'] = user.userId;

        console.log(await this.jwtService.signAsync(payload));
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

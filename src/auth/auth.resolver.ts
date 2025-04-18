import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input';
import { TokenResponse } from './dto/token-response';
import { TelegramAuthInput } from './dto/telegram-auth.input';
import { OtherAuthInput } from './dto/other-auth.input';

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => TokenResponse, { name: 'signIn' })
    async signIn(@Args('signIn') signIn: LoginInput) {
        return await this.authService.signIn(signIn);
    }

    @Mutation(() => TokenResponse, { name: 'authByTelegram' })
    async authByTelegram(@Args('authByTelegram') authByTelegram: TelegramAuthInput) {
        return await this.authService.authByTelegram(authByTelegram);
    }
    @Mutation(() => TokenResponse, { name: 'authByOther' })
    async authByOther(@Args('authByOther') authByOther: OtherAuthInput, @Args('key') key: 'google' | 'vk') {
        return await this.authService.authByOther(authByOther, key);
    }
}

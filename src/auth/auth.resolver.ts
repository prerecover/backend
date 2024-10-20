import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input';
import { TokenResponse } from './dto/token-response';

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => TokenResponse, { name: 'signIn' })
    async signIn(@Args('signIn') signIn: LoginInput) {
        return await this.authService.signIn(signIn);
    }
}

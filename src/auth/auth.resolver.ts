import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input';
import { TokenResponse } from './dto/token-response';

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query(() => TokenResponse, { name: 'signIn' })
    async findAll(@Args('signIn') signIn: LoginInput) {
        console.log(await this.authService.signIn(signIn));
        return await this.authService.signIn(signIn);
    }
}

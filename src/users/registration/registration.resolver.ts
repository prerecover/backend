import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RegistrationService } from './registration.service';
import { RegistrationUser } from './dto/registration-user.input';
import { User } from '../entities/user.entity';
import { VerifyCodeInput } from './dto/verify-code.input';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { NewPasswordInput } from './dto/new-password.input';

@Resolver('regitration')
export class RegistrationResolver {
    constructor(private readonly registrationService: RegistrationService) {}

    @Mutation(() => User)
    async registrationUser(@Args('registrationInput') registration: RegistrationUser) {
        return await this.registrationService.createUser(registration);
    }

    @Mutation(() => Boolean, { name: 'verifyCode' })
    async verifyCode(@Args('verifyCodeInput') verifyCodeInput: VerifyCodeInput) {
        return await this.registrationService.verifyCode(verifyCodeInput);
    }

    @Mutation(() => Boolean, { name: 'resendVerifyCode' })
    async resendVerifyCode(@Args('email') email: string) {
        return await this.registrationService.resendVerifyCode(email);
    }
    @Query(() => Boolean, { name: 'resendForgotCode' })
    async resendForgotCode(@Args('email') email: string) {
        return await this.registrationService.resendForgotCode(email);
    }

    @Mutation(() => Boolean, { name: 'forgotPassword' })
    async forgotPassword(@Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput) {
        return await this.registrationService.forgotPassword(forgotPasswordInput);
    }

    @Mutation(() => Boolean, { name: 'newPassword' })
    async newPassword(@Args('newPasswordInput') newPasswordInput: NewPasswordInput) {
        return await this.registrationService.newPassword(newPasswordInput);
    }
}

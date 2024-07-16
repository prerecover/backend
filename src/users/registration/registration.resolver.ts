import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RegistrationService } from './registration.service';
import { Registration } from './entities/registration.entity';
import { RegistrationUser } from './dto/registration-user.input';
import { User } from '../entities/user.entity';

@Resolver(() => Registration)
export class RegistrationResolver {
    constructor(private readonly registrationService: RegistrationService) { }

    @Mutation(() => User)
    async registrationUser(@Args('registrationInput') registration: RegistrationUser) {
        return await this.registrationService.createUser(registration);
    }

    @Query(() => [Registration], { name: 'registration' })
    async findAll() {
        return await this.registrationService.findAll();
    }
}

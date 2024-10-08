import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: 'Bearer',
            signOptions: { expiresIn: '7d' },
        }),
    ],
    providers: [AuthResolver, AuthService, AuthGuard],
    exports: [AuthService, AuthGuard],
})
export class AuthModule {}

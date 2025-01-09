import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UsersModule,
        JwtModule.register({
            global: true,
            secret: 'Bearer',
            signOptions: { expiresIn: '90d' },
        }),
    ],
    providers: [AuthResolver, AuthService, AuthGuard],
    exports: [AuthService, AuthGuard],
})
export class AuthModule {}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { LokiLogger } from 'nestjs-loki-logger';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}
    private readonly logger = new LokiLogger(AuthGuard.name);
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            this.logger.error('Token not found');
            throw new UnauthorizedException('Token not found');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            request['user'] = await this.userService.findOne(payload._id);
        } catch {
            this.logger.error('Token no valid or expired');
            throw new UnauthorizedException();
        }
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        try {
            const [type, token] = request.headers['authorization'].split(' ') ?? [];
            return type === 'Bearer' ? token : undefined;
        } catch {
            throw new UnauthorizedException();
        }
    }
}

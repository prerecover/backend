import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UndergoingsResolver } from './undergoings.resolver';
import { UndergoingsService } from './undergoings.service';
import { Undergoing } from './entities/undergoing.entity';
import { AppointmentsModule } from 'src/appointments/appointments.module';

@Module({
    imports: [TypeOrmModule.forFeature([Undergoing]), AppointmentsModule],
    providers: [UndergoingsResolver, UndergoingsService],
    exports: [UndergoingsService],
})
export class UndergoingsModule {}

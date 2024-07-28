import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from './entities/service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Doctor, Service])],
    providers: [ServicesResolver, ServicesService],
    exports: [ServicesService],
})
export class ServicesModule {}

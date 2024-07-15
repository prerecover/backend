import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsResolver } from './doctors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Doctor])],
  providers: [DoctorsResolver, DoctorsService],
})
export class DoctorsModule {}

import { forwardRef, Module } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SavedResolver } from './saved.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { News } from 'src/news/entities/news.entity';
import { UsersModule } from 'src/users/users.module';
import { Saved } from './entities/saved.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { ClinicsModule } from 'src/clinics/clinics.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { ServicesModule } from 'src/services/services.module';
import { UndergoingsModule } from 'src/undergoings/undergoings.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([News, User, Saved, Clinic, Doctor]),
        forwardRef(() => UsersModule),
        forwardRef(() => ClinicsModule),
        forwardRef(() => UndergoingsModule),
        DoctorsModule,
        ServicesModule,
    ],
    providers: [SavedResolver, SavedService],
    exports: [SavedService],
})
export class SavedModule {}

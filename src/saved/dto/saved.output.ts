import { InputType, Field } from '@nestjs/graphql';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';

@InputType()
export class SavedDTO {
    @Field()
    clinics: Clinic[];

    @Field()
    doctors: Doctor[];

    @Field()
    services: Service[];
}

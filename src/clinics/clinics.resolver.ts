import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClinicsService } from './clinics.service';
import { Clinic } from './entities/clinic.entity';
import { CreateClinicInput } from './dto/create-clinic.input';
import { UpdateClinicInput } from './dto/update-clinic.input';

@Resolver(() => Clinic)
export class ClinicsResolver {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Mutation(() => Clinic)
  createClinic(@Args('createClinicInput') createClinicInput: CreateClinicInput) {
    return this.clinicsService.create(createClinicInput);
  }

  @Query(() => [Clinic], { name: 'clinics' })
  findAll() {
    return this.clinicsService.findAll();
  }

  @Query(() => Clinic, { name: 'clinic' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clinicsService.findOne(id);
  }

  @Mutation(() => Clinic)
  updateClinic(@Args('updateClinicInput') updateClinicInput: UpdateClinicInput) {
    return this.clinicsService.update(updateClinicInput.id, updateClinicInput);
  }

  @Mutation(() => Clinic)
  removeClinic(@Args('id', { type: () => Int }) id: number) {
    return this.clinicsService.remove(id);
  }
}

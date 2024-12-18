import { InputType, PartialType } from '@nestjs/graphql';
import { RegisterClinicInput } from './registration/register-input';

@InputType()
export class UpdateClinicInput extends PartialType(RegisterClinicInput) {}

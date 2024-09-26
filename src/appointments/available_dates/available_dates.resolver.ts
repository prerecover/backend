import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AvailableDate } from './entities/availableDate.entity';
import { AvailableDatesService } from './available_dates.service';
import { AvailableDateInput } from './dto/availableDate.dto';

@Resolver(() => AvailableDate)
export class AvailableDateResolver {
  constructor(private readonly dateService: AvailableDatesService) {}
  @Mutation(() => Boolean, { name: 'setAvailableDates' })
  async setDates(@Args('availableDateInput') availableDateInput: AvailableDateInput): Promise<boolean> {
    return await this.dateService.setDates(availableDateInput.appointmentId, availableDateInput.availableDates);
  }
}

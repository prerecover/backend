import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SavedService } from './saved.service';
import { Saved } from './entities/saved.entity';
import { CreateSavedInput } from './dto/create-saved.input';
import { UpdateSavedInput } from './dto/update-saved.input';

@Resolver(() => Saved)
export class SavedResolver {
  constructor(private readonly savedService: SavedService) {}

  @Mutation(() => Saved)
  createSaved(@Args('createSavedInput') createSavedInput: CreateSavedInput) {
    return this.savedService.create(createSavedInput);
  }

  @Query(() => [Saved], { name: 'saved' })
  findAll() {
    return this.savedService.findAll();
  }

  @Query(() => Saved, { name: 'saved' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.savedService.findOne(id);
  }

  @Mutation(() => Saved)
  updateSaved(@Args('updateSavedInput') updateSavedInput: UpdateSavedInput) {
    return this.savedService.update(updateSavedInput.id, updateSavedInput);
  }

  @Mutation(() => Saved)
  removeSaved(@Args('id', { type: () => Int }) id: number) {
    return this.savedService.remove(id);
  }
}
